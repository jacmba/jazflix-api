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
    console.log('Loaded auth certs: ' + JSON.stringify(this.certs, null, 2));
  }

  validate(token: string): string | boolean {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      console.error('Token cannot be decoded: ' + token);
      return false;
    }
    if (!decoded.header) {
      console.error('Missing token headers');
      return false;
    }
    if (decoded.header.alg != 'RS256') {
      console.error('Invalid token algorithm');
      return false;
    }
    const secret = this.certs[decoded.header.kid];
    if (!secret || secret.length === 0) {
      console.error('Missing certificate for kid ' + decoded.header.kid);
      return false;
    }
    try {
      const payload = jwt.verify(token, secret, {
        algorithms: ['RS256'],
      }) as TokenPayloadDto;

      if (!payload || payload.aud !== AuthConfig.CLIENT_ID) {
        console.error('Invalid aud: ' + payload.aud);
        return false;
      }

      if (!payload.email || payload.email.length === 0) {
        console.error('Missing email');
        return false;
      }

      if (!payload.email_verified) {
        console.error('Email not verified');
        return false;
      }

      return payload.email;
    } catch (e) {
      console.error('Invalid token signature: ' + e);
      return false;
    }
  }
}
