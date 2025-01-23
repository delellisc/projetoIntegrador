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
}
