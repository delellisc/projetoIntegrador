import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Profissional } from '../../profissionais/entities/profissionai.entity';

@Entity('especializacao')
export class Especializacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToMany(() => Profissional, (profissional) => profissional.especializacao)
    profissionais: Profissional[];
}
