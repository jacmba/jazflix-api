import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryColumn({ name: '_id' })
  id: string;

  @Column()
  name: string;

  @Column()
  allowed: boolean;
}
