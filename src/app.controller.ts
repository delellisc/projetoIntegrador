import { PacientesService } from './pacientes/pacientes.service';
import { Controller, Get, Param, Req, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pacientesService: PacientesService
  ) {}

  //funcao para paciente logado
  @Get('paciente/:id')
  @Render('pagina_inicial_logado')
  async getPaciente(@Param('id') id: number) {
    const paciente = await this.pacientesService.findOne(id);
    return { paciente };
  }

  
  @Get('agendamentos')
  @Render('pagina_agendamentos')
  getAgendamentos() {
    return { message: 'atendimento é bom'}
  }

  @Get('perfil')
  @Render('pagina_perfil')
  getPerfil() {
    return { message: 'perfil visualizado'}
  }
  
  @Get('historico')
  @Render('pagina_historico')
  getHistorico() {
    return { message: 'aqui está o historico'}
  }

  @Get('home')
  @Render('index')
  getIndex(){
    return {}
  }
}
