import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Movie } from 'src/model/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Promise<Movie[]> {
    return this.moviesService.find();
  }
}
