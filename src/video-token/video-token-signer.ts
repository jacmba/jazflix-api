import { Injectable } from '@nestjs/common';
import { VideoTokenHasher } from './video-token-hasher';
import VideoTokenDto from '../model/dto/videoToken.dto';
import * as jwt from 'jsonwebtoken';
import AuthConfig from '../config/auth.config';

@Injectable()
export class VideoTokenSigner {
  constructor(private readonly hasher: VideoTokenHasher) {}

  getToken(idToken: string): string {
    const secret = AuthConfig.SIGN_SECRET;
    const obj = this.hasher.getObject(idToken);
    const hash = this.hasher.getHash(obj);

    const payload: VideoTokenDto = {
      user: obj.email,
      hash,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6,
    };

    const token = jwt.sign(payload, secret);

    return token;
  }
}
