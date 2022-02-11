import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoTokenValidator } from '../video-token/video-token-validator';
import User from '../model/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoAuthGuard implements CanActivate {
  constructor(
    private readonly validator: VideoTokenValidator,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.query.token;

    const username = this.validator.validate(token);
    if (!username) {
      console.error('Token validation failed');
      return false;
    }

    const user = await this.userRepo.findOne({ name: username as string });
    if (!user) {
      console.error('User not found');
      return false;
    }

    if (!user.allowed) {
      console.error('User is not allowed');
      return false;
    }

    return true;
  }
}
