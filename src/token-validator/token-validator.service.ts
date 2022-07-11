import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import AuthConfig from '../config/auth.config';
import TokenPayloadDto from '../model/dto/tokenPayload.dto';

@Injectable()
export class TokenValidatorService implements OnModuleInit {
  certs: object;

  private readonly logger = new Logger(TokenValidatorService.name);

  async onModuleInit() {
    const result = await axios.get(AuthConfig.CERTS_URI);
    this.certs = result.data;
    this.logger.log(
      'Loaded auth certs: ' + JSON.stringify(this.certs, null, 2),
    );
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  scheduledCertRefresh() {
    this.onModuleInit();
  }

  validate(token: string): string | boolean {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      this.logger.error('Token cannot be decoded: ' + token);
      return false;
    }
    if (!decoded.header) {
      this.logger.error('Missing token headers');
      return false;
    }
    if (decoded.header.alg != 'RS256') {
      this.logger.error('Invalid token algorithm');
      return false;
    }
    const secret = this.certs[decoded.header.kid];
    if (!secret || secret.length === 0) {
      this.logger.error('Missing certificate for kid ' + decoded.header.kid);
      return false;
    }
    try {
      const payload = jwt.verify(token, secret, {
        algorithms: ['RS256'],
      }) as TokenPayloadDto;

      if (!payload || payload.aud !== AuthConfig.CLIENT_ID) {
        this.logger.error('Invalid aud: ' + payload.aud);
        return false;
      }

      if (!payload.email || payload.email.length === 0) {
        this.logger.error('Missing email');
        return false;
      }

      if (!payload.email_verified) {
        this.logger.error('Email not verified');
        return false;
      }

      return payload.email;
    } catch (e) {
      this.logger.error('Invalid token signature: ' + e);
      return false;
    }
  }
}
