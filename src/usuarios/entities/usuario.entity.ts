/* import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Profissional } from 'src/profissionais/entities/profissionai.entity'; */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  nome: string;
}
