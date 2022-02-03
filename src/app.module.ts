import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import DbConfig from './config/db.config';
import { Movie } from './model/entity/movie.entity';
import { SectionsModule } from './sections/sections.module';
import { AuthModule } from './auth/auth.module';
import { TokenValidatorModule } from './token-validator/token-validator.module';
import Section from './model/entity/section.entity';
import User from './model/entity/user.entity';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: DbConfig.TYPE,
      host: DbConfig.HOST,
      port: DbConfig.PORT,
      database: DbConfig.DB,
      synchronize: DbConfig.SYNC,
      entities: [Movie, Section, User],
    }),
    SectionsModule,
    TokenValidatorModule,
    AuthModule,
  ],
})
export class AppModule {}
