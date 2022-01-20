import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../model/entity/movie.entity';
import MovieDto from '../model/dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async find(): Promise<MovieDto[]> {
    const movies = await this.moviesRepository.find();

    return movies.map(
      (m: Movie): MovieDto => ({
        id: m.id,
        title: m.title,
        description: m.description,
        image: m.image,
      }),
    );
  }
}
