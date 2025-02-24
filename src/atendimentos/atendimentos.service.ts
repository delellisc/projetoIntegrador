import { Injectable, Inject } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { Repository } from 'typeorm';
import { Atendimento } from './entities/atendimento.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class AtendimentosService {
  
  constructor(
    @Inject('ATENDIMENTO_REPOSITORY')
    private atendimentoRepository: Repository<Atendimento>,

    @Inject('PACIENTE_REPOSITORY')
    private pacienteRepository: Repository<Paciente>
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

  async removeByDate(data: string){
    let dataConvertida = new Date(data);
    const atendimento = await this.atendimentoRepository.findOne({where: {horario: dataConvertida}});
    if (atendimento){
      return this.atendimentoRepository.remove(atendimento);
    }
    return null;
  }

  findAtendimentoByDate(data: string) {
      return this.atendimentoRepository
        .createQueryBuilder('atendimento')
        .select([
          'atendimento.id AS atendimento_id',
          'atendimento.horario AS atendimento_horario',
          'atendimento.status AS atendimento_status',
          'profissional.id AS profissional_id',
          'profissional.nome AS profissional_nome',
          'profissional.registro_profissional AS profissional_registro',
          'profissional.status AS profissional_status',
          'especializacao.nome AS especializacao_nome',
        ])
        .innerJoin('atendimento.profissional', 'profissional')
        .innerJoin('profissional.especializacao', 'especializacao')
        .where('DATE(atendimento.horario) = :data', { data })
        .getRawMany();
    }

  findAtendimentoByHour(data: string) {
    return this.atendimentoRepository
      .createQueryBuilder('atendimento')
      .select([
        'atendimento.id AS atendimento_id',
        'profissional.id AS profissional_id'
      ])
      .innerJoin('atendimento.profissional', 'profissional')
      .where('atendimento.horario = :data', { data })
      .getRawOne();
  }

  async createConsulta(atendimentoId: number, pacienteId: number) {
    const atendimento = await this.atendimentoRepository.findOne({
      where: { id: atendimentoId },
      relations: ['pacientes'],
    });
  
    if (!atendimento) {
      throw new Error('Atendimento not found');
    }
  
    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
  
    if (!paciente) {
      throw new Error('Paciente not found');
    }
  
    if (!atendimento.pacientes.some(p => p.id === pacienteId)) {
      atendimento.pacientes.push(paciente);
      await this.atendimentoRepository.save(atendimento);
    }
  
    return atendimento;
  }  

  async findConsulta(atendimentoId: number, pacienteId: number) {
    const atendimento = await this.atendimentoRepository.findOne({
      where: { id: atendimentoId },
      relations: ['pacientes'],
    });
  
    if (!atendimento) {
      throw new Error('Atendimento not found');
    }
  
    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
  
    if (!paciente) {
      throw new Error('Paciente not found');
    }
  
    if (atendimento.pacientes.some(p => p.id === pacienteId)) {
      return atendimento;
    }
    return;
  }

  async removeConsulta(atendimentoId: number, pacienteId: number) {
    const atendimento = await this.atendimentoRepository.findOne({
      where: { id: atendimentoId },
      relations: ['pacientes'],
    });
  
    if (!atendimento) {
      throw new Error('Atendimento not found');
    }
  
    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });

    if (!paciente) {
      throw new Error('Paciente not found');
    }
    
    atendimento.pacientes = atendimento.pacientes.filter(p => p.id !== pacienteId);
    return await this.atendimentoRepository.save(atendimento);
  }    
}
