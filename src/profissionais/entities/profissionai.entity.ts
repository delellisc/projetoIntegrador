import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';
import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';

@Entity('profissional')
export class Profissional {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column()
  nome: string;

  @Column()
  registro_profissional: string;

  @Column()
  status: string;

  @ManyToOne(() => Especializacao, (especializacao) => especializacao.profissionais)
  especializacao: Especializacao;

  @OneToMany(() => Atendimento, (atendimento) => atendimento.profissional)
  atendimentos: Atendimento[];
}
