import {
  Controller,
  Get,
  Headers,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response } from 'express';

import MovieDto from '../model/dto/movie.dto';
import { MoviesService } from './movies.service';
import { AuthGuard } from '../auth/auth-guard';
import { VideoAuthGuard } from '../auth/video-auth-guard';

@Controller('movies')
@ApiExtraModels(MovieDto)
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Movies list endpoint' })
  @ApiOkResponse({
    description: 'Get list of available movies',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(MovieDto) },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getMovies(): Promise<MovieDto[]> {
    return this.moviesService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Movie streaming endpoint',
    description:
      'Binary video streaming, using special extended duration signed token.',
  })
  @ApiOkResponse({ description: 'Full set of movie file bytes' })
  @ApiResponse({ status: 206, description: 'Partial chunk of bytes' })
  @UseGuards(VideoAuthGuard)
  @ApiQuery({
    name: 'token',
    description: 'Special video token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A',
  })
  @ApiParam({
    name: 'id',
    description: 'Movie unique ID',
    example: 'deieruiuoxcit1245430dfsdhf',
  })
  @ApiHeader({
    name: 'Range',
    description: 'Stream chunk bytes range',
    required: false,
    example: '0-100',
  })
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
