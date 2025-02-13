import { Injectable, Inject } from '@nestjs/common';
import { CreateProfissionaiDto } from './dto/create-profissionai.dto';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto';
import { Repository } from 'typeorm';
import { Profissional } from './entities/profissionai.entity';

@Injectable()
export class ProfissionaisService {

  constructor(
    @Inject('PROFISSIONAL_REPOSITORY')
    private profissionalRepository: Repository<Profissional>
  ){}

  create(createProfissionaiDto: CreateProfissionaiDto) {
    const profissional = this.profissionalRepository.create(createProfissionaiDto);
    return this.profissionalRepository.save(profissional);
    // return 'This action adds a new profissionai';
  }

  findAll() {
    return this.profissionalRepository.find();
    // return `This action returns all profissionais`;
  }

  findOne(id: number) {
    return this.profissionalRepository.findOne({where: {id: id}});
    // return `This action returns a #${id} profissionai`;
  }

  update(id: number, updateProfissionaiDto: UpdateProfissionaiDto) {
    return this.profissionalRepository.update(id, updateProfissionaiDto);
    // return `This action updates a #${id} profissionai`;
  }

  async remove(id: number) {
    const profissional = await this.profissionalRepository.findOne({where: {id: id}});
    if (profissional){
      return this.profissionalRepository.remove(profissional);
    }
    return null;
    // return `This action removes a #${id} profissionai`;
  }

  findAtendimentos(id: number) {
    return this.profissionalRepository
      .createQueryBuilder('profissional')
      .select([
        'profissional.id AS profissional_id',
        'profissional.nome AS profissional_nome',
        'profissional.registro_profissional AS profissional_registro',
        'profissional.status AS profissional_status',
        'atendimento.id AS atendimento_id',
        'atendimento.horario AS atendimento_horario',
        'atendimento.status AS atendimento_status',
        'paciente.id AS paciente_id',
        'paciente.nome AS paciente_nome',
        'paciente.data_nascimento AS paciente_data_nascimento',
      ])
      .innerJoin('atendimento', 'atendimento', 'atendimento."profissionalId" = profissional.id')
      .innerJoin('atendimento.pacientes', 'paciente')
      .where('profissional.id = :id', { id })
      .getRawMany();
  }  
}
