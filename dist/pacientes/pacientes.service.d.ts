import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
export declare class PacientesService {
    private pacienteRepository;
    constructor(pacienteRepository: Repository<Paciente>);
    create(createPacienteDto: CreatePacienteDto): Promise<Paciente>;
    findAll(): Promise<Paciente[]>;
    findOne(id: number): Promise<Paciente>;
    update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Paciente>;
    findAtendimentos(id: number): Promise<any[]>;
    findUpcomingAtendimentos(id: number): Promise<any[]>;
}
