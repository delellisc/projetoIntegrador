import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class Paciente {
    usuario: Usuario;
    id: number;
    sexo: string;
    data_nascimento: Date;
    contato: string;
    atendimentos: Atendimento[];
}
