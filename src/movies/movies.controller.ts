import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import MovieDto from '../model/dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Promise<MovieDto[]> {
    return this.moviesService.find();
  }
}
