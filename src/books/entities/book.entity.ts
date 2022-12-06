import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn() // idem serial primary key (incremente tt seul)
  id?: number;

  @Column({
    nullable: false, // pour que ce soit jamais nulle
  })
  title: string;

  @Column({
    nullable: false,
    type: 'date', // eviter probleme de format de date
  })
  dateParution: string;
}
