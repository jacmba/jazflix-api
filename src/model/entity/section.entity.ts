import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sections' })
export default class Section {
  @PrimaryColumn({ name: '_id' })
  id: string;

  @Column()
  icon: string;

  @Column()
  title: string;

  @Column()
  to: string;

  @Column()
  order?: number;
}
