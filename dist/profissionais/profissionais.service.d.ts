import { CreateProfissionaiDto } from './dto/create-profissionai.dto';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto';
import { Repository } from 'typeorm';
import { Profissional } from './entities/profissionai.entity';
export declare class ProfissionaisService {
    private profissionalRepository;
    constructor(profissionalRepository: Repository<Profissional>);
    create(createProfissionaiDto: CreateProfissionaiDto): Promise<Profissional>;
    findAll(): Promise<Profissional[]>;
    findOne(id: number): Promise<Profissional>;
    update(id: number, updateProfissionaiDto: UpdateProfissionaiDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Profissional>;
    findAtendimentos(id: number): Promise<any[]>;
    findAtendimentoByDate(id: number, data: string): Promise<any[]>;
    findAtendimentoPacientesByDate(id: number, data: string): Promise<any[]>;
    isRegistered(id: number): Promise<boolean>;
}
