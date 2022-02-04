import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import TokenResponseDto from '../model/dto/tokenResponse.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @ApiOkResponse()
  getAuth(): string {
    return this.authService.requestAuth();
  }

  @Get('token')
  @ApiOkResponse()
  getAuthToken(@Query('code') code: string): Promise<TokenResponseDto> {
    return this.authService.getToken(code);
  }

  @Get('refresh')
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getRefreshToken(@Query('code') code: string): Promise<string> {
    return this.authService.refreshToken(code);
  }
}
