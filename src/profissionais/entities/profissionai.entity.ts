import { Entity, Column, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('profissional')
export class Profissional {
  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id' })
  usuario: Usuario;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registro_profissional: string;

  @Column()
  status: string;

  @ManyToOne(() => Especializacao, (especializacao) => especializacao.profissionais)
  especializacao: Especializacao;
}
