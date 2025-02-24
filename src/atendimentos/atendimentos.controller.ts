import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';

@Controller('atendimentos')
export class AtendimentosController {
  constructor(private readonly atendimentosService: AtendimentosService) {}

  @Post()
  create(@Body() createAtendimentoDto: CreateAtendimentoDto) {
    return this.atendimentosService.create(createAtendimentoDto);
  }

  @Get()
  findAll() {
    return this.atendimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atendimentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtendimentoDto: UpdateAtendimentoDto) {
    return this.atendimentosService.update(+id, updateAtendimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atendimentosService.remove(+id);
  }


  @Delete('/data/:horario')
  removeAtendimentoByDate(@Param('horario') horario: string) {
    return this.atendimentosService.removeByDate(horario);
  }


  @Get('/data/:date')
  findAtendimentoByDate(@Param('date') date: string){
    return this.atendimentosService.findAtendimentoByDate(date);
  }

  @Get('/horario/:horario')
  findAtendimentoByHour(@Param('horario') horario: string){
    return this.atendimentosService.findAtendimentoByHour(horario);
  }

  @Post('/consultas')
  createConsulta(@Body() body: { atendimentoId: number; pacienteId: number }) {
    return this.atendimentosService.createConsulta(body.atendimentoId, body.pacienteId);
  }  
}
