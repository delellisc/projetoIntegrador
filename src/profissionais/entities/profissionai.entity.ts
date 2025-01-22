import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profissional')
export class Profissional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column()
  registro_profissional: string;

  @Column()
  status: string;
}
