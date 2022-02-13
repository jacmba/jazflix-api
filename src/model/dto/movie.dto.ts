import { ApiProperty } from '@nestjs/swagger';

export default class MovieDto {
  @ApiProperty({
    description: 'Unique identifier for movie object',
    example: 'riopufi3o54ih3ytihfdhsr',
  })
  id: string;

  @ApiProperty({
    description: 'Movie title',
    example: 'When the dog raises the nose',
  })
  title: string;

  @ApiProperty({
    description: 'Brief description of the movie',
    example: 'An amazing movie with cute characters',
  })
  description: string;

  @ApiProperty({
    description: 'Movie cover image url',
    example: 'http://example.com/awesomemovie.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Optional comma-separated extra tags',
    example: 'drama,series',
  })
  extra?: string;
}
