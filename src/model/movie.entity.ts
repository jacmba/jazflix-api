import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryColumn({ name: '_id' })
  id: string;

  @Column()
  title: string;
}
