import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
export declare class Paciente {
    id: number;
    nome: string;
    sexo: string;
    data_nascimento: Date;
    contato: string;
    atendimentos: Atendimento[];
}
