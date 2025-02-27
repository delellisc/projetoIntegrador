import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
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

  @Column()
  qtd_pacientes: number;

  @ManyToMany(() => Paciente, (paciente) => paciente.atendimentos)
  @JoinTable({name: "consultas"})
  pacientes: Paciente[];

  @ManyToOne(() => Profissional, (profissional) => profissional.id)
  profissional: Profissional;
}
