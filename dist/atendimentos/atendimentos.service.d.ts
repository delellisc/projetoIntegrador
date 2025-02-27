import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { Repository } from 'typeorm';
import { Atendimento } from './entities/atendimento.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
export declare class AtendimentosService {
    private atendimentoRepository;
    private pacienteRepository;
    constructor(atendimentoRepository: Repository<Atendimento>, pacienteRepository: Repository<Paciente>);
    create(createAtendimentoDto: CreateAtendimentoDto): Promise<Atendimento>;
    findAll(): Promise<Atendimento[]>;
    findOne(id: number): Promise<Atendimento>;
    update(id: number, updateAtendimentoDto: UpdateAtendimentoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Atendimento>;
    removeByDate(data: string): Promise<Atendimento>;
    findAtendimentoByDate(data: string): Promise<any[]>;
    findAtendimentoByHour(data: string): Promise<any>;
    createConsulta(atendimentoId: number, pacienteId: number): Promise<Atendimento>;
    findConsulta(atendimentoId: number, pacienteId: number): Promise<Atendimento>;
    removeConsulta(atendimentoId: number, pacienteId: number): Promise<Atendimento>;
    findPacientes(id: number): Promise<Paciente[]>;
}
