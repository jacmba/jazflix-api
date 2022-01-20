import {
  Controller,
  Get,
  HttpException,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import MovieDto from '../model/dto/movie.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse()
  getMovies(): Promise<MovieDto[]> {
    return this.moviesService.find();
  }

  @Get(':id')
  @ApiOkResponse()
  async getMovieVideo(@Param('id') id: string, @Res() res: Response) {
    const video = await this.moviesService.findOne(id);

    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      size: video.size,
    });
    video.stream.pipe(res);
  }
}
