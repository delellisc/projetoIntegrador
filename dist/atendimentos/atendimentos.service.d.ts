import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
export declare class AtendimentosService {
    create(createAtendimentoDto: CreateAtendimentoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAtendimentoDto: UpdateAtendimentoDto): string;
    remove(id: number): string;
}
