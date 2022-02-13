import { ApiProperty } from '@nestjs/swagger';

export default class SectionDto {
  @ApiProperty({ description: 'Material icon image name', example: 'mdi-home' })
  icon: string;

  @ApiProperty({
    description: 'Title of the section to be displayed',
    example: 'Home',
  })
  title: string;

  @ApiProperty({ description: 'Internal link path', example: '/home' })
  to: string;
}
