import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';

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

  @ManyToOne(() => Especializacao, (especializacao) => especializacao.profissionais)
  especializacao: Especializacao;
}
