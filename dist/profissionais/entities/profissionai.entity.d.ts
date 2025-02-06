import { Especializacao } from '../../especializacoes/entities/especializacoe.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class Profissional {
    usuario: Usuario;
    id: number;
    registro_profissional: string;
    status: string;
    especializacao: Especializacao;
}
