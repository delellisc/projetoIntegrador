import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
import { Entity, Column, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryColumn({type: 'bigint'})
  id: number;

  @Column()
  nome: string;
  
  // @Column()
  // sexo: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column()
  contato: string;

  @ManyToMany(() => Atendimento, (atendimento) => atendimento.pacientes)
  atendimentos: Atendimento[]
}
