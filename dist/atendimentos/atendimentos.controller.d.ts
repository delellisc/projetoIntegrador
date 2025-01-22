import { AtendimentosService } from './atendimentos.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
export declare class AtendimentosController {
    private readonly atendimentosService;
    constructor(atendimentosService: AtendimentosService);
    create(createAtendimentoDto: CreateAtendimentoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAtendimentoDto: UpdateAtendimentoDto): string;
    remove(id: string): string;
}
