import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../auth/auth-guard';
import { AuthModule } from '../auth/auth.module';
import { VideoAuthGuard } from '../auth/video-auth-guard';
import { Movie } from '../model/entity/movie.entity';
import User from '../model/entity/user.entity';
import { TokenValidatorModule } from '../token-validator/token-validator.module';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import VideoLoader from '../utils/videoLoader';
import { VideoTokenModule } from '../video-token/video-token.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { VideoTokenValidator } from '../video-token/video-token-validator';
import { VideoTokenHasher } from '../video-token/video-token-hasher';
import { IpBypasserService } from '../auth/ip-bypasser/ip-bypasser.service';
import AuthConfig from '../config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, User]),
    AuthModule,
    TokenValidatorModule,
    VideoTokenModule,
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    VideoLoader,
    AuthGuard,
    TokenValidatorService,
    VideoTokenValidator,
    VideoTokenHasher,
    VideoAuthGuard,
    IpBypasserService,
    {
      provide: 'ALLOWED_IPS_LIST',
      useValue: AuthConfig.ALLOWED_IPS,
    },
  ],
})
export class MoviesModule {}
