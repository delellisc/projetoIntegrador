import { PacientesService } from './pacientes/pacientes.service';
import { Controller, Get, Param, Req, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';
// import { Session } from 'inspector/promises';

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
  getPerfil(@Session() session: Record<string, any>) {
    if (!session.user) {
      return { message: 'usuario nao autenticado'}
    }
    return {user: session.user}
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
  
  @Get('admin')
  @Render('pagina_admin')
  getAdmin(){
    return {}
  }
}
