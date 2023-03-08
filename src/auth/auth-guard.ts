import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import User from '../model/entity/user.entity';
import { Repository } from 'typeorm';
import { IpBypasserService } from './ip-bypasser/ip-bypasser.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly validator: TokenValidatorService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly bypassService: IpBypasserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const ipBypass = this.bypassService.bypass(req.ip);
    if (ipBypass) {
      return true;
    }

    let token: string;
    if (req.headers.authorization) {
      const bearerReg = /^Bearer\s(ey.+$)/i;
      if (!bearerReg.test(req.headers.authorization)) {
        console.error('Invalid JWT token format');
        return false;
      }

      [, token] = bearerReg.exec(req.headers.authorization);
      console.log('Provided token: ' + token);
    } else {
      console.error('Missing auth token');
      return false;
    }

    const tokenUserName = this.validator.validate(token);

    if (!tokenUserName || (tokenUserName as string).length === 0) {
      console.error('Invalid token');
      return false;
    }

    const user = await this.userRepo.findOne({ name: tokenUserName as string });

    if (!user) {
      console.error(`User ${tokenUserName} not found`);
      return false;
    }

    if (!user.allowed) {
      console.error(`User ${tokenUserName} is not allowed to use this API`);
      return false;
    }

    return true;
  }
}
