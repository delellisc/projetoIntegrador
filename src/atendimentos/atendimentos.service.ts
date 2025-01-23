import { Injectable, Inject } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { Repository } from 'typeorm';
import { Atendimento } from './entities/atendimento.entity';

@Injectable()
export class AtendimentosService {
  
  constructor(
    @Inject('ATENDIMENTO_REPOSITORY')
    private atendimentoRepository: Repository<Atendimento>
  ){}

  create(createAtendimentoDto: CreateAtendimentoDto) {
    const atendimento = this.atendimentoRepository.create(createAtendimentoDto);
    return this.atendimentoRepository.save(atendimento);
    // return 'This action adds a new atendimento';
  }

  findAll(): Promise<Atendimento[]> {
    return this.atendimentoRepository.find();
    // return `This action returns all atendimentos`;
  }

  findOne(id: number) {
    return this.atendimentoRepository.findOne({where: {id: id}});
    // return `This action returns a #${id} atendimento`;
  }

  update(id: number, updateAtendimentoDto: UpdateAtendimentoDto) {
    return this.atendimentoRepository.update(id, updateAtendimentoDto);
    // return `This action updates a #${id} atendimento`;
  }

  async remove(id: number) {
    const atendimento = await this.atendimentoRepository.findOne({where: {id: id}});
    if (atendimento){
      return this.atendimentoRepository.remove(atendimento);
    }
    return null;
    // return `This action removes a #${id} atendimento`;
  }
}
