import { PacientesService } from './pacientes/pacientes.service';
import { ProfissionaisService } from './profissionais/profissionais.service';
import { Controller, Get, Param, Req, Render, Session, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';  // Import Response from Express

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pacientesService: PacientesService,
    private readonly profissionalService: ProfissionaisService
  ) {}

  //funcao para paciente logado
  @Get('paciente/:id')
  @Render('pagina_inicial_logado')
  async getPaciente(@Param('id') id: number) {
    const paciente = await this.pacientesService.findOne(id);
    return { paciente };
  }

  @Get('agendamentos')
  async getAgendamentos(@Session() session: Record<string, any>, @Res() res: Response) {
    // redireciona para página inicial caso não esteja logado
    if (!session.user) {
      return res.redirect('/home');
    }
  
    // chama o método "isRegistered" para verificar existência do profissional no banco
    const isProfissional = await this.profissionalService.isRegistered(session.user.matricula)
    const view = isProfissional ? 'pagina_agendamentos_profissional' : 'pagina_agendamentos_paciente' ;
  
    return res.render(view, { user: session.user, id: session.user.matricula });
  }  

  @Get('perfil')
  async getPerfil(@Session() session: Record<string, any>, @Res() res: Response) {
    // redireciona para página inicial caso não esteja logado
    if (!session.user) {
      return res.redirect('/home');
    }
  
    // chama o método "isRegistered" para verificar existência do profissional no banco
    const isProfissional = await this.profissionalService.isRegistered(session.user.matricula)
    var view = '';
    var userObject = session.user;
    var userProf = {};
    if(isProfissional){
      view = 'pagina_perfil_profissional';
      userProf = await this.profissionalService.findOne(session.user.matricula);
    }
    else {
      view = 'pagina_perfil_paciente';
    };
  
    return res.render(view, { user: userObject, userProf: userProf});
  }  
  /* @Get('perfil')
  @Render('pagina_perfil')
  getPerfil(@Session() session: Record<string, any>, @Res() res: Response) {
    if (!session.user) {
      return { error: 'Usuário não autenticado' };
    } 
    if (!session.user) {
      return res.redirect('/home');
    }
    return { user: session.user, message: 'perfil visualizado' };
  } */

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
