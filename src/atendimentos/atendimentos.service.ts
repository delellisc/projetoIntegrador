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

  async findAtendimentoByDate(data: string): Promise<any[]> {
      return this.atendimentoRepository
        .createQueryBuilder('atendimento')
        .leftJoinAndSelect('atendimento.profissional', 'profissional') // Join with Profissional
        .leftJoinAndSelect('profissional.especializacao', 'especializacao') // Join with Especializacao
        /* .leftJoinAndSelect('atendimento.pacientes', 'paciente') // Join with Paciente (Many-to-Many) */
        .select([
          'atendimento.id AS atendimento_id',
          'atendimento.horario AS atendimento_horario',
          'atendimento.status AS atendimento_status',
          'profissional.id AS profissional_id',
          'profissional.nome AS profissional_nome',
          'profissional.registro_profissional AS profissional_registro',
          'profissional.status AS profissional_status',
          'especializacao.nome AS especializacao_nome',
          /* 'paciente.id AS paciente_id', */
          /* 'paciente.nome AS paciente_nome', */
          /* 'paciente.data_nascimento AS paciente_data_nascimento', */
        ])
        .where('DATE(atendimento.horario) = :data', { data }) // Filter by date
        .getMany(); // Use getRawMany() to return raw results
    }
}
