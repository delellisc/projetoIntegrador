import { Controller, Get, Query, Redirect, Res, Req, Post, Session, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { session } from 'passport';
import { PacientesService } from '../pacientes/pacientes.service';
import { CreatePacienteDto } from '../pacientes/dto/create-paciente.dto';
import { ProfissionaisService } from '../profissionais/profissionais.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pacienteService: PacientesService,
    private readonly profissionalService: ProfissionaisService
  ) { }

  //rota para o login
  @Get('login')
  @Redirect()
  login() {
    return { url: this.authService.getAuthUrl() };
  }

  //rota para o logout
  @Get('logout') 
  async logout(@Res() res: Response, @Session() session?: Record<string,any>) {
    if (session){
      session.destroy((erro) => {
        if(erro) {
          return res.status(500).json({error: "erro ao encerrar a sessão"})
        }
        return res.redirect('/home')
      });
    } else {
      return res.redirect('/home')
    }
  }
  
  //rota pra pagina inicial
  @Get('pagina_inicial_logado')
  async renderHome(
    @Res() res: Response,
    @Session() session?: Record<string, any>) { //função pra redenrizer a apgina e persistir os dados do usuario
    if (!session || !session.user) {
      return res.redirect('/auth/login') //se a sessao expirar, volta pro login
    }

    const pacienteId = session.user.matricula
    /* const atendimentos = await this.pacienteService.findAtendimentos(pacienteId); */
    const atendimentos = await this.pacienteService.findAtendimentos(pacienteId);
    // console.log(atendimentos);
    /* console.log("Atendimentos encontrados:", atendimentos); //debug */
    /* const msg1 = 'Campanha de vacinação do dia 08/06 ao dia 18/06!!' 
    const msg2 = 'Procure a unidade de saúde do seu bairro para se vacinar!'  */

    return res.render('pagina_inicial_logado', { user: session.user, id: session.user.matricula })
  }

  //função callback
  @Get('callback')

  async callback(
    @Query('code') code: string,
    @Res() res: Response,
    @Session() session?: Record<string, any>,
  ) {
    if (!code) {
      return res.status(400).json({ error: 'Código de autorização ausente' });
    }

    if (!session) {
      console.error("Erro: sessão não foi inicializada!");
      return res.status(500).json({ error: 'Sessão não inicializada' });
    }

    try {
      const token = await this.authService.exchangeCodeForToken(code);
      // const token = code
      // console.log(code)
      // console.log(client_id)
      session.token = token;

      const userData = await this.authService.getUserData(token);
      /* console.log(userData) */
      session.user = userData; //armazena os dados do usuário na sessão

      let redirectURL: string;

      const isProfissional = await this.profissionalService.isRegistered(userData.matricula) //chama a função pra ver se o profissional existe
      // verificação para paciente/profissional
      if (!isProfissional) {

        const pacienteDto: CreatePacienteDto = {
          id: userData.matricula,
          nome: userData.nome_usual,
          data_nascimento: userData.data_nascimento,
          contato: userData.email
        }

        await this.pacienteService.findOrCreate(pacienteDto) //criação do paciente, caso nao exista
        redirectURL = "http://localhost:3000/auth/pagina_inicial_logado" //rota pro paciente
      }
      else {
        /* if (!isProfissional) {
          return res.status(403).json({ error: 'Acesso negado: professor não cadastrado' });
        } */

        redirectURL = "http://localhost:3000/agendamentos"
      }
      return res.redirect(302, redirectURL);

    } catch (error) {
      console.log("erro:", error)//depuração
      return res.status(401).json({ error: 'Falha ao autenticar' });
    }
  }

  @Get('user')
  getUser(@Session() session: Record<string, any>) {
    if (!session.user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return session.user;
  }
}