import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';
export declare class Profissional {
    id: number;
    login: string;
    senha: string;
    nome: string;
    registro_profissional: string;
    status: string;
    especializacao: Especializacao;
}
