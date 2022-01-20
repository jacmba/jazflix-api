import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import MovieDto from '../model/dto/movie.dto';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: MoviesService,
          useValue: mockMoviesService,
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
