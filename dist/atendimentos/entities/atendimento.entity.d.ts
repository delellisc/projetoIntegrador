import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Profissional } from '../../profissionais/entities/profissionai.entity';
export declare class Atendimento {
    id: number;
    horario: Date;
    status: string;
    pacientes: Paciente[];
    profissional: Profissional;
}
