import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Profissional } from '../../profissionais/entities/profissionai.entity';

@Entity('atendimento')
export class Atendimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  horario: Date;

  @Column()
  status: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.id)
  paciente: Paciente;

  @ManyToOne(() => Profissional, (profissional) => profissional.id)
  profissional: Profissional;
}
