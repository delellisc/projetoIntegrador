import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column()
  sexo: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column()
  contato: string;

  @ManyToMany(() => Atendimento, (atendimento) => atendimento.pacientes)
  atendimentos: Atendimento[]
}
