import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiExtraModels,
  getSchemaPath,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import TokenResponseDto from '../model/dto/tokenResponse.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';

@Controller('auth')
@ApiTags('Auth')
@ApiExtraModels(TokenResponseDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Oauth2 initialization endpoint' })
  @ApiOkResponse({
    description: 'Get URL for further redirection to start Oauth2 process',
    schema: {
      type: 'string',
      example:
        'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=profile+email&client_id=123456.apps.googleusercontent.com&redirect_uri=https://example.com/auth&access_type=offline&prompt=consent',
    },
  })
  getAuth(): string {
    return this.authService.requestAuth();
  }

  @Get('token')
  @ApiOperation({ summary: 'Oauth2 client token endpoint' })
  @ApiOkResponse({
    description: 'Get client authorized token data',
    schema: {
      $ref: getSchemaPath(TokenResponseDto),
    },
  })
  @ApiQuery({
    name: 'code',
    description: 'Code obtaned after successful authentication',
    example: '4/0asdfskldhw54399ydsfghei',
  })
  getAuthToken(@Query('code') code: string): Promise<TokenResponseDto> {
    return this.authService.getToken(code);
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Oauth2 token refresh endpoint' })
  @ApiOkResponse({
    description: 'Get new Jwt ID client token',
    schema: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A',
    },
  })
  @ApiQuery({
    name: 'code',
    description: 'Refresh token',
    example: '1//gjroyiu23849393',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getRefreshToken(@Query('code') code: string): Promise<string> {
    return this.authService.refreshToken(code);
  }

  @Get('/video')
  @ApiOperation({
    summary: 'Video token endpoint',
    description:
      'The token provided is to be used with the video endpoint. It is passed as a query parameter and has a more extended duration',
  })
  @ApiOkResponse({
    description: 'Get special JWT client token for video streaming',
    schema: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A',
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getVideoToken(@Request() req: Request): string {
    const authHeader = req.headers['authorization'];
    const [, idToken] = authHeader.split(' ');
    const token = this.authService.getVideoToken(idToken);
    return token;
  }
}
