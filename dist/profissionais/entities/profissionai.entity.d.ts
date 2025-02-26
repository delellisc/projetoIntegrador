import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';
import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
export declare class Profissional {
    id: number;
    nome: string;
    registro_profissional: string;
    status: string;
    especializacao: Especializacao;
    atendimentos: Atendimento[];
}
