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

  find(): Promise<MovieDto[]> {
    return this.moviesRepository.find();
  }
}
