import { Injectable } from '@nestjs/common';
import HashableObjectDto from '../model/dto/hashableObject.dto';
import * as jwt from 'jsonwebtoken';
import AuthConfig from '../config/auth.config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VideoTokenHasher {
  getObject(token: string): HashableObjectDto {
    const decoded = jwt.decode(token) as HashableObjectDto;
    const result: HashableObjectDto = {
      iss: decoded.iss,
      azp: decoded.azp,
      aud: decoded.aud,
      email: decoded.email,
      email_verified: decoded.email_verified,
      name: decoded.name,
      picture: decoded.picture,
      given_name: decoded.given_name,
      family_name: decoded.family_name,
    };
    return result;
  }

  getHash(obj: HashableObjectDto): string {
    const token = JSON.stringify(obj);
    const rounds = AuthConfig.SIGN_SALT_ROUNDS;

    const hash = bcrypt.hashSync(token, rounds);
    return hash;
  }
}
