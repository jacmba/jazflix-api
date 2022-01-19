import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import DbConfig from './config/db.config';
import { Movie } from './model/movie.entity';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: DbConfig.TYPE,
      host: DbConfig.HOST,
      port: DbConfig.PORT,
      database: DbConfig.DB,
      synchronize: DbConfig.SYNC,
      entities: [Movie],
    }),
  ],
})
export class AppModule {}
