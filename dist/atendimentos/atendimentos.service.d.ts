import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { Repository } from 'typeorm';
import { Atendimento } from './entities/atendimento.entity';
export declare class AtendimentosService {
    private atendimentoRepository;
    constructor(atendimentoRepository: Repository<Atendimento>);
    create(createAtendimentoDto: CreateAtendimentoDto): Promise<Atendimento>;
    findAll(): Promise<Atendimento[]>;
    findOne(id: number): Promise<Atendimento>;
    update(id: number, updateAtendimentoDto: UpdateAtendimentoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Atendimento>;
    findAtendimentoByDate(data: string): Promise<any[]>;
}
