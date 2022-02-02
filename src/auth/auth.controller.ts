import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

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
  getAuthToken(@Query('code') code: string): Promise<string> {
    return this.authService.getToken(code);
  }
}
