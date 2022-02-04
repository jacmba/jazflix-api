import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { stringify } from 'qs';

import AuthConfig from '../config/auth.config';
import AuthRequestDto from '../model/dto/authRequest.dto';
import TokenRequestDto from '../model/dto/tokenRequest.dto';
import TokenResponseDto from '../model/dto/tokenResponse.dto';
import Constants from '../utils/constants';

@Injectable()
export class AuthService {
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
