import { CreateEspecializacoeDto } from './dto/create-especializacoe.dto';
import { UpdateEspecializacoeDto } from './dto/update-especializacoe.dto';
import { Especializacao } from './entities/especializacoe.entity';
import { Repository } from 'typeorm';
export declare class EspecializacoesService {
    private especializacaoRepository;
    constructor(especializacaoRepository: Repository<Especializacao>);
    create(createEspecializacoeDto: CreateEspecializacoeDto): string;
    findAll(): Promise<Especializacao[]>;
    findOne(id: number): string;
    update(id: number, updateEspecializacoeDto: UpdateEspecializacoeDto): string;
    remove(id: number): string;
}
