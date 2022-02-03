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

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, User]),
    AuthModule,
    TokenValidatorModule,
  ],
  providers: [SectionsService, AuthGuard, TokenValidatorService],
  controllers: [SectionsController],
})
export class SectionsModule {}
