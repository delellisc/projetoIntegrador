import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacientesController {
    private readonly pacientesService;
    constructor(pacientesService: PacientesService);
    create(createPacienteDto: CreatePacienteDto): Promise<import("./entities/paciente.entity").Paciente>;
    findAll(): Promise<import("./entities/paciente.entity").Paciente[]>;
    findOne(id: string): Promise<import("./entities/paciente.entity").Paciente>;
    update(id: string, updatePacienteDto: UpdatePacienteDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("./entities/paciente.entity").Paciente>;
    findAtendimentos(id: number): Promise<any[]>;
    findAtendimentosPendentes(id: number): Promise<any[]>;
}
