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
}
