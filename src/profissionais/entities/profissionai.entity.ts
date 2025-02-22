import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';

@Entity('profissional')
export class Profissional {
  @PrimaryColumn({type: 'bigint'})
  id: string;

  @Column()
  nome: string;

  @Column()
  registro_profissional: string;

  @Column()
  status: string;

  @ManyToOne(() => Especializacao, (especializacao) => especializacao.profissionais)
  especializacao: Especializacao;
}
