import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth-guard';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import { TokenValidatorModule } from '../token-validator/token-validator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';
import { VideoTokenModule } from '../video-token/video-token.module';
import { VideoTokenHasher } from '../video-token/video-token-hasher';
import { VideoTokenSigner } from '../video-token/video-token-signer';
import { VideoTokenValidator } from '../video-token/video-token-validator';
import { VideoAuthGuard } from './video-auth-guard';
import { IpBypasserService } from './ip-bypasser/ip-bypasser.service';
import AuthConfig from '../config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenValidatorModule,
    VideoTokenModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    TokenValidatorService,
    VideoTokenHasher,
    VideoTokenSigner,
    VideoTokenValidator,
    VideoAuthGuard,
    IpBypasserService,
    {
      provide: 'ALLOWED_IPS_LIST',
      useValue: AuthConfig.ALLOWED_IPS,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
