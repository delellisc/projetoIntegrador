import { AtendimentosService } from './atendimentos.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
export declare class AtendimentosController {
    private readonly atendimentosService;
    constructor(atendimentosService: AtendimentosService);
    create(createAtendimentoDto: CreateAtendimentoDto): Promise<import("./entities/atendimento.entity").Atendimento>;
    findAll(): Promise<import("./entities/atendimento.entity").Atendimento[]>;
    findOne(id: string): Promise<import("./entities/atendimento.entity").Atendimento>;
    update(id: string, updateAtendimentoDto: UpdateAtendimentoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("./entities/atendimento.entity").Atendimento>;
    findAtendimentoByDate(date: string): Promise<any[]>;
}
