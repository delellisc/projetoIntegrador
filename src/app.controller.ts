import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pagina_inicial_logado')
  root() {
    return { msg1: 'Campanha de vacinação do dia 08/06 ao dia 18/06!!', 
      msg2: 'Procure a unidade de saúde do seu bairro para se vacinar!' 
    };
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
}
