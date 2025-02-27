import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Profissional } from '../../profissionais/entities/profissionai.entity';
export declare class Atendimento {
    id: number;
    horario: Date;
    status: string;
    qtd_pacientes: number;
    pacientes: Paciente[];
    profissional: Profissional;
}
