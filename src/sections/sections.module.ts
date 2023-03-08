import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsController } from './sections.controller';
import Section from '../model/entity/section.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth-guard';
import { TokenValidatorModule } from '../token-validator/token-validator.module';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import User from '../model/entity/user.entity';
import { IpBypasserService } from '../auth/ip-bypasser/ip-bypasser.service';
import AuthConfig from '../config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, User]),
    AuthModule,
    TokenValidatorModule,
  ],
  providers: [
    SectionsService,
    AuthGuard,
    TokenValidatorService,
    IpBypasserService,
    {
      provide: 'ALLOWED_IPS_LIST',
      useValue: AuthConfig.ALLOWED_IPS,
    },
  ],
  controllers: [SectionsController],
})
export class SectionsModule {}
