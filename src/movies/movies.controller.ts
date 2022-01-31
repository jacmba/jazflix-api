import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

import MovieDto from '../model/dto/movie.dto';
import { MoviesService } from './movies.service';

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
  async getMovieVideo(
    @Param('id') id: string,
    @Res() res: Response,
    @Headers('Range') range: string,
  ) {
    if (range) {
      const [start, end] = range.replace(/bytes=/, '').split('-');

      const video = await this.moviesService.findOne(id, start, end);
      const head = {
        'Content-Type': 'video/mp4',
        'Content-Length': video.size,
        'Content-Range': `bytes ${start}-${video.end}/${video.totalSize}`,
        'Accept-Ranges': 'bytes',
      };
      res.writeHead(206, head);
      video.stream.pipe(res);
    } else {
      const video = await this.moviesService.findOne(id, '', '');
      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': video.totalSize,
      });
      video.stream.pipe(res);
    }
  }
}
