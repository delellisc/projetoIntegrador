import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pagina_inicial_logado')
  root() {
    return { message: 'saude123' };
  }

  @Get('agendamentos/profissional')
  @Render('pagina_agendamentos_profissional')
  getAgendamentosProfisisonal() {
    return { message: 'Página de agendamentos na visão do paciente'}
  }

  @Get('agendamentos/paciente')
  @Render('pagina_agendamentos_paciente')
  getAgendamentosPaciente() {
    return { message: 'Página de agendamentos na visão do paciente'}
  }

  @Get('perfil')
  @Render('pagina_perfil')
  getPerfil() {
    return { message: 'perfil visualizado'}
  }
}
