import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entity, Column, ManyToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id' })
  usuario: Usuario;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sexo: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column()
  contato: string;

  @ManyToMany(() => Atendimento, (atendimento) => atendimento.pacientes)
  atendimentos: Atendimento[]
}
