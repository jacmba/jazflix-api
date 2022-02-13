import { ApiProperty } from '@nestjs/swagger';

export default class TokenResponseDto {
  @ApiProperty({
    description: 'ID Jwt token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A',
  })
  token: string;

  @ApiProperty({
    description: 'Special token used to get a new ID Jwt',
    example: '1//gjroyiu23849393',
  })
  refresh_token: string;
}
