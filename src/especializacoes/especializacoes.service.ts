import { Inject, Injectable } from '@nestjs/common';
import { CreateEspecializacoeDto } from './dto/create-especializacoe.dto';
import { UpdateEspecializacoeDto } from './dto/update-especializacoe.dto';
import { Especializacao } from './entities/especializacoe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecializacoesService {
  constructor(
    @Inject('ESPECIALIZACAO_REPOSITORY')
    private especializacaoRepository: Repository<Especializacao>
  ){}

  create(createEspecializacoeDto: CreateEspecializacoeDto) {
    return 'This action adds a new especializacoe';
  }

  findAll() {
    return this.especializacaoRepository.find();
    /* return `This action returns all especializacoes`; */
  }

  findOne(id: number) {
    return `This action returns a #${id} especializacoe`;
  }

  update(id: number, updateEspecializacoeDto: UpdateEspecializacoeDto) {
    return `This action updates a #${id} especializacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} especializacoe`;
  }
}
