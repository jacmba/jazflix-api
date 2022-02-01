import { Injectable } from '@nestjs/common';
import Constants from '../utils/constants';
import AuthRequestDto from '../model/dto/authRequest.dto';
import AuthConfig from '../config/auth.config';
import { stringify } from 'qs';

@Injectable()
export class AuthService {
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
