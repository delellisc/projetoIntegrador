import { ProfissionaisService } from './profissionais.service';
import { CreateProfissionaiDto } from './dto/create-profissionai.dto';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto';
export declare class ProfissionaisController {
    private readonly profissionaisService;
    constructor(profissionaisService: ProfissionaisService);
    create(createProfissionaiDto: CreateProfissionaiDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProfissionaiDto: UpdateProfissionaiDto): string;
    remove(id: string): string;
}
