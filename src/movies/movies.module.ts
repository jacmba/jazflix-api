import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../model/entity/movie.entity';
import VideoLoader from '../utils/videoLoader';
import User from '../model/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TokenValidatorModule } from '../token-validator/token-validator.module';
import { AuthGuard } from '../auth/auth-guard';
import { TokenValidatorService } from '../token-validator/token-validator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, User]),
    AuthModule,
    TokenValidatorModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, VideoLoader, AuthGuard, TokenValidatorService],
})
export class MoviesModule {}
