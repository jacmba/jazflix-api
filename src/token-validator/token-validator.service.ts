import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import AuthConfig from '../config/auth.config';

@Injectable()
export class TokenValidatorService implements OnModuleInit {
  certs: object;

  async onModuleInit() {
    const result = await axios.get(AuthConfig.CERTS_URI);
    this.certs = result.data;
  }

  validate(token: string): boolean {
    const decoded = jwt.decode(token, { complete: true });
    if (decoded.header.alg != 'RS256') {
      return false;
    }
    const secret = this.certs[decoded.header.kid];
    if (!secret || secret.length === 0) {
      return false;
    }
    try {
      const valid = jwt.verify(token, secret, { algorithms: ['RS256'] });

      return !!valid;
    } catch (e) {
      return false;
    }
  }
}
