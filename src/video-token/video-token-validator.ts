import { Injectable } from '@nestjs/common';
import { VideoTokenHasher } from './video-token-hasher';
import * as jwt from 'jsonwebtoken';
import VideoTokenDto from '../model/dto/videoToken.dto';
import * as bcrypt from 'bcrypt';
import AuthConfig from '../config/auth.config';

@Injectable()
export class VideoTokenValidator {
  constructor(private readonly hasher: VideoTokenHasher) {}

  validate(token: string): boolean {
    if (!token || token.length === 0) {
      console.error('Empty token provided');
      return false;
    }

    const [videoToken, idToken] = token.split('$$$$$');

    if (!videoToken) {
      console.error('Missing video token');
      return false;
    }

    if (!idToken) {
      console.error('Missing ID hash token');
      return false;
    }

    const idObj = this.hasher.getObject(idToken);

    const decoded = jwt.decode(videoToken) as VideoTokenDto;
    if (decoded.user !== idObj.email) {
      console.error('Token user mismath');
      return false;
    }

    const hashMatch = bcrypt.compareSync(JSON.stringify(idObj), decoded.hash);
    if (!hashMatch) {
      console.error('Hash mismatch');
      return false;
    }

    try {
      const secret = AuthConfig.SIGN_SECRET;
      const validation = jwt.verify(videoToken, secret);
      if (!validation) {
        console.log('Invalid token');
        return false;
      }
    } catch (e) {
      console.error('Invalid token', e);
      return false;
    }

    return true;
  }
}
