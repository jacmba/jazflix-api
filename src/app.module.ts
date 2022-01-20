import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import DbConfig from './config/db.config';
import { Movie } from './model/entity/movie.entity';
import { SectionsModule } from './sections/sections.module';
import Section from './model/entity/section.entity';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: DbConfig.TYPE,
      host: DbConfig.HOST,
      port: DbConfig.PORT,
      database: DbConfig.DB,
      synchronize: DbConfig.SYNC,
      entities: [Movie, Section],
    }),
    SectionsModule,
  ],
})
export class AppModule {}
