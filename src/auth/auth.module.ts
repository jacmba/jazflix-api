import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth-guard';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import { TokenValidatorModule } from '../token-validator/token-validator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenValidatorModule],
  providers: [AuthService, AuthGuard, TokenValidatorService],
  controllers: [AuthController],
})
export class AuthModule {}
