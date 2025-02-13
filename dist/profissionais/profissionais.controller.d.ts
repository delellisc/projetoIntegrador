import { ProfissionaisService } from './profissionais.service';
import { CreateProfissionaiDto } from './dto/create-profissionai.dto';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto';
export declare class ProfissionaisController {
    private readonly profissionaisService;
    constructor(profissionaisService: ProfissionaisService);
    create(createProfissionaiDto: CreateProfissionaiDto): Promise<import("./entities/profissionai.entity").Profissional>;
    findAll(): Promise<import("./entities/profissionai.entity").Profissional[]>;
    findOne(id: string): Promise<import("./entities/profissionai.entity").Profissional>;
    update(id: string, updateProfissionaiDto: UpdateProfissionaiDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("./entities/profissionai.entity").Profissional>;
    findAtendimentos(id: string): Promise<any[]>;
}
