import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { CreateProfissionaiDto } from './dto/create-profissionai.dto';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto';

@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  @Post()
  create(@Body() createProfissionaiDto: CreateProfissionaiDto) {
    return this.profissionaisService.create(createProfissionaiDto);
  }

  @Get()
  findAll() {
    return this.profissionaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profissionaisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfissionaiDto: UpdateProfissionaiDto) {
    return this.profissionaisService.update(+id, updateProfissionaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profissionaisService.remove(+id);
  }

  @Get('/atendimentos/:id')
  findAtendimentos(@Param('id') id: string){
    return this.profissionaisService.findAtendimentos(+id);
  }

  @Get('/agendamentos/:data/:id')
  findAtendimentosByDate(@Param('data') data: string, @Param('id') id: string){
    return this.profissionaisService.findAtendimentoByDate(+id, data);
  }

  @Get('/agendamentos/:data/:id/pacientes')
  findAtendimentosPacientesByDate(@Param('data') data: string, @Param('id') id: string){
    return this.profissionaisService.findAtendimentoPacientesByDate(+id, data);
  }
}
