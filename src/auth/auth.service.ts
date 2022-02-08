import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { stringify } from 'qs';

import AuthConfig from '../config/auth.config';
import AuthRequestDto from '../model/dto/authRequest.dto';
import TokenRequestDto from '../model/dto/tokenRequest.dto';
import TokenResponseDto from '../model/dto/tokenResponse.dto';
import Constants from '../utils/constants';
import User from '../model/entity/user.entity';
import { Repository } from 'typeorm';
import { TokenValidatorService } from '../token-validator/token-validator.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly validatorService: TokenValidatorService,
  ) {}

  async refreshToken(code: string): Promise<string> {
    const params: TokenRequestDto = {
      client_id: AuthConfig.CLIENT_ID,
      client_secret: AuthConfig.CLIENT_SECRET,
      redirect_uri: AuthConfig.REDIRECT_URI,
      grant_type: Constants.AUTH.REFRESH_GRANT_TYPE,
      refresh_token: code,
    };

    const result = await axios.post(AuthConfig.TOKEN_URI, null, { params });
    return result.data.id_token;
  }

  async getToken(code: string): Promise<TokenResponseDto> {
    const params: TokenRequestDto = {
      client_id: AuthConfig.CLIENT_ID,
      client_secret: AuthConfig.CLIENT_SECRET,
      redirect_uri: AuthConfig.REDIRECT_URI,
      grant_type: Constants.AUTH.TOKEN_GRANT_TYPE,
      code,
    };

    const result = await axios.post(AuthConfig.TOKEN_URI, null, { params });

    const username = this.validatorService.validate(result.data.id_token);
    if (!username) {
      throw new HttpException('Invalid ID token', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepo.findOne({ name: username as string });
    if (!user) {
      throw new HttpException(
        `User ${username} not found`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user.allowed) {
      throw new HttpException(
        `User ${username} not allowed`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      token: result.data.id_token,
      refresh_token: result.data.refresh_token,
    };
  }

  requestAuth(): string {
    const queryObj: AuthRequestDto = {
      response_type: Constants.AUTH.REQUEST_RESPONSE_TYPE,
      scope: Constants.AUTH.REQUEST_SCOPE,
      client_id: AuthConfig.CLIENT_ID,
      redirect_uri: AuthConfig.REDIRECT_URI,
      access_type: Constants.AUTH.REQUEST_ACCESS_TYPE,
      prompt: Constants.AUTH.REQUEST_PROMPT,
    };
    return (AuthConfig.REQUEST_URI + '?' + stringify(queryObj)).replace(
      '%2B',
      '+',
    );
  }
}
