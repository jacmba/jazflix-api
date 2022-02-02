import { Injectable } from '@nestjs/common';
import Constants from '../utils/constants';
import AuthRequestDto from '../model/dto/authRequest.dto';
import AuthConfig from '../config/auth.config';
import { stringify } from 'qs';
import TokenRequestDto from '../model/dto/tokenRequest.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  async getToken(code: string): Promise<any> {
    const params: TokenRequestDto = {
      client_id: AuthConfig.CLIENT_ID,
      client_secret: AuthConfig.CLIENT_SECRET,
      redirect_uri: AuthConfig.REDIRECT_URI,
      grant_type: Constants.AUTH.TOKEN_GRANT_TYPE,
      code,
    };

    const result = await axios.post(AuthConfig.TOKEN_URI, null, { params });
    return result.data.id_token;
  }

  requestAuth(): string {
    const queryObj: AuthRequestDto = {
      response_type: Constants.AUTH.REQUEST_RESPONSE_TYPE,
      scope: Constants.AUTH.REQUEST_SCOPE,
      client_id: AuthConfig.CLIENT_ID,
      redirect_uri: AuthConfig.REDIRECT_URI,
      access_type: Constants.AUTH.REQUEST_ACCESS_TYPE,
    };
    return (AuthConfig.REQUEST_URI + '?' + stringify(queryObj)).replace(
      '%2B',
      '+',
    );
  }
}
