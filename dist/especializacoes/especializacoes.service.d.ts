import { CreateEspecializacoeDto } from './dto/create-especializacoe.dto';
import { UpdateEspecializacoeDto } from './dto/update-especializacoe.dto';
export declare class EspecializacoesService {
    create(createEspecializacoeDto: CreateEspecializacoeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEspecializacoeDto: UpdateEspecializacoeDto): string;
    remove(id: number): string;
}
