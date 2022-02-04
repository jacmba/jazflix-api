import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import MovieDto from '../model/dto/movie.dto';
import { AuthGuard } from '../auth/auth-guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';
import { TokenValidatorService } from '../token-validator/token-validator.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  const mockMoviesService = {
    find: jest.fn().mockImplementation((): Promise<MovieDto[]> => {
      return Promise.resolve([
        {
          id: '1',
          title: 'My movie',
          description: '',
          image: '',
          video: '',
        },
      ]);
    }),
  };

  const mockAuthGuard = {};
  const mockUserRepo = {};
  const mockTokenValidator = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: TokenValidatorService,
          useValue: mockTokenValidator,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should get movies lilst', async () => {
    const movies = await controller.getMovies();

    expect(movies).toBeDefined();
    expect(movies.length).toBe(1);
    expect(movies[0].id).toBe('1');
    expect(movies[0].title).toBe('My movie');
  });
});
