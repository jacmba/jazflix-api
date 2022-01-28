import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../model/entity/movie.entity';
import MovieDto from '../model/dto/movie.dto';
import VideoLoader from '../utils/videoLoader';
import VideoDto from '../model/dto/video.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    private readonly loader: VideoLoader,
  ) {}

  async find(): Promise<MovieDto[]> {
    const movies = await this.moviesRepository.find();

    return movies.map(
      (m: Movie): MovieDto => ({
        id: m.id,
        title: m.title,
        description: m.description,
        image: m.image,
        extra: m.extra,
      }),
    );
  }

  async findOne(id: string, start: string, end: string): Promise<VideoDto> {
    const movie: Movie = await this.moviesRepository.findOne(id);
    const a = start && start.length > 0 ? parseInt(start) : undefined;
    const b = end && end.length > 0 ? parseInt(end) : undefined;
    return this.loader.load(movie.video, a, b);
  }
}
