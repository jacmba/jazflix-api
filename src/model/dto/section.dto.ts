import { ApiProperty } from '@nestjs/swagger';

export default class SectionDto {
  @ApiProperty()
  icon: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  to: string;
}
