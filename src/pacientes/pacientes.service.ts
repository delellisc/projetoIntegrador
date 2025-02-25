import { Injectable, Inject } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity'

@Injectable()
export class PacientesService {

  constructor(
     @Inject('PACIENTE_REPOSITORY')
     private pacienteRepository: Repository<Paciente>
  ){}

  create(createPacienteDto: CreatePacienteDto) {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    return this.pacienteRepository.save(paciente);
    // return 'This action adds a new paciente';
  }

  findAll() {
    return this.pacienteRepository.find();
    // return `This action returns all pacientes`;
  }

  findOne(id: number) {
    return this.pacienteRepository.findOne({where: {id: id}});
    // return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteRepository.update(id, updatePacienteDto);
    // return `This action updates a #${id} paciente`;
  }

  async remove(id: number) {
    const paciente = await this.pacienteRepository.findOne({where: {id: id}});
    if (paciente){
      return this.pacienteRepository.remove(paciente);
    }
    return null;
    // return `This action removes a #${id} paciente`;
  }

  findAtendimentos(id: number) {
    return this.pacienteRepository
      .createQueryBuilder('paciente')
      .select([
        'atendimento.id AS atendimento_id',
        'atendimento.horario AS atendimento_horario',
        'profissional.nome AS profissional_nome',
        'profissional.registro_profissional AS profissional_registro',
        'especializacao.nome AS especializacao_nome'
      ])
      .innerJoin('paciente.atendimentos', 'atendimento')
      .innerJoin('atendimento.profissional', 'profissional')
      .innerJoin('profissional.especializacao', 'especializacao')
      .where('paciente.id = :id', { id })
      .andWhere('atendimento.horario < CURRENT_TIMESTAMP')
      .getRawMany();
  }

  findUpcomingAtendimentos(id: number) {
    return this.pacienteRepository
      .createQueryBuilder('paciente')
      .select([
        'atendimento.id AS atendimento_id',
        'atendimento.horario AS atendimento_horario',
        'profissional.nome AS profissional_nome',
        'profissional.registro_profissional AS profissional_registro',
        'especializacao.nome AS especializacao_nome'
      ])
      .innerJoin('paciente.atendimentos', 'atendimento')
      .innerJoin('atendimento.profissional', 'profissional')
      .innerJoin('profissional.especializacao', 'especializacao')
      .where('paciente.id = :id', { id })
      .andWhere('atendimento.horario > CURRENT_TIMESTAMP')
      .getRawMany();
  }
}