import { EspecializacoesService } from './especializacoes.service';
import { CreateEspecializacoeDto } from './dto/create-especializacoe.dto';
import { UpdateEspecializacoeDto } from './dto/update-especializacoe.dto';
export declare class EspecializacoesController {
    private readonly especializacoesService;
    constructor(especializacoesService: EspecializacoesService);
    create(createEspecializacoeDto: CreateEspecializacoeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEspecializacoeDto: UpdateEspecializacoeDto): string;
    remove(id: string): string;
}
