import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Movie } from '../model/entity/movie.entity';
import { MoviesService } from './movies.service';
import VideoDto from '../model/dto/video.dto';
import VideoLoader from '../utils/videoLoader';

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

    findOne: jest.fn().mockImplementation((id): Promise<Movie> => {
      return Promise.resolve({
        id,
        title: 'Movie ' + id,
        description: 'Test movie',
        image: `movie${id}.png`,
        video: `movie${id}.mpg`,
      });
    }),
  };

  const mockVideoLoader = {
    load: jest.fn().mockImplementation(
      (name: string): VideoDto => ({
        size: 1000,
        stream: null,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMoviesRepo,
        },
        {
          provide: VideoLoader,
          useValue: mockVideoLoader,
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
    expect(mockMoviesRepo.find).toHaveBeenCalled();
    expect(movies).toBeDefined();
    expect(movies.length).toBe(1);
    expect(movies[0].id).toBe('1');
    expect(movies[0].title).toBe('Movie 1');
  });

  it('Should get a movie video from DB', async () => {
    const video = await service.findOne('1');
    expect(mockMoviesRepo.findOne).toHaveBeenCalledTimes(1);
    expect(mockMoviesRepo.findOne).toHaveBeenCalledWith('1');
    expect(mockVideoLoader.load).toHaveBeenCalledTimes(1);
    expect(video).toBeDefined();
    expect(video.size).toBe(1000);
    expect(video.stream).toBeNull();
  });
});
