import { ApiProperty } from '@nestjs/swagger';

export default class MovieDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  extra?: string;
}
