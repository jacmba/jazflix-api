import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import AuthConfig from '../config/auth.config';
import TokenPayloadDto from '../model/dto/tokenPayload.dto';

@Injectable()
export class TokenValidatorService implements OnModuleInit {
  certs: object;

  async onModuleInit() {
    const result = await axios.get(AuthConfig.CERTS_URI);
    this.certs = result.data;
  }

  validate(token: string): string | boolean {
    const decoded = jwt.decode(token, { complete: true });
    if (decoded.header.alg != 'RS256') {
      return false;
    }
    const secret = this.certs[decoded.header.kid];
    if (!secret || secret.length === 0) {
      return false;
    }
    try {
      const payload = jwt.verify(token, secret, {
        algorithms: ['RS256'],
      }) as TokenPayloadDto;

      if (!payload || payload.aud !== AuthConfig.CLIENT_ID) {
        return false;
      }

      if (!payload.email || payload.email.length === 0) {
        return false;
      }

      if (!payload.email_verified) {
        return false;
      }

      return payload.email;
    } catch (e) {
      return false;
    }
  }
}
