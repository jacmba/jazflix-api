import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../model/entity/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  const mockMoviesRepo = {
    find: jest.fn().mockImplementation((): Promise<Movie[]> => {
      return Promise.resolve([
        {
          id: '1',
          title: 'Movie 1',
          description: 'Foo bar',
          image: 'foo.png',
          video: 'foo.mpg',
        },
      ]);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMoviesRepo,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get a simple list', async () => {
    const movies = await service.find();
    expect(movies).toBeDefined();
    expect(movies.length).toBe(1);
    expect(movies[0].id).toBe('1');
    expect(movies[0].title).toBe('Movie 1');
  });
});
