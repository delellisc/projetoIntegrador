import { CreateProfissionaiDto } from './dto/create-profissionai.dto';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto';
export declare class ProfissionaisService {
    create(createProfissionaiDto: CreateProfissionaiDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProfissionaiDto: UpdateProfissionaiDto): string;
    remove(id: number): string;
}
