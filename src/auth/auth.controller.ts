import { Controller, Get, Query, Redirect, Res, Req, Post, Session, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { session } from 'passport';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { CreatePacienteDto } from 'src/pacientes/dto/create-paciente.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pacienteService: PacientesService) {}

  //rota para o login do 
  @Get('login')
  @Redirect()
  login() {
    return { url: this.authService.getAuthUrl() };
  }

  //rota pra pagina inicial
  @Get('pagina_inicial_logado')
  async renderHome(@Res() res: Response, @Session() session?: Record<string,any>){ //função pra redenrizer a apgina e persistir os dados do usuario
    if (!session || !session.user){
      return res.redirect('/auth/login') //se a sessao expirar, volta pro login
    }

    const pacienteId = session.user.id
    const atendimentos = await this.pacienteService.findAtendimentos(pacienteId)
    const msg1 = 'Campanha de vacinação do dia 08/06 ao dia 18/06!!' 
    const msg2 = 'Procure a unidade de saúde do seu bairro para se vacinar!' 

    return res.render('pagina_inicial_logado', {user: session.user, atendimentos, msg1: msg1, msg2: msg2})
  }

  //troca o codigo pego token 
  @Get('callback')
  @Redirect('http://localhost:3000/auth/pagina_inicial_logado', 302)
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
      console.log(userData)
      session.user = userData; //armazena os dados do usuário na sessão

      const pacienteDto: CreatePacienteDto = {
        id: userData.matricula,
        nome: userData.nome_usual,
        data_nascimento: userData.data_nascimento,
        contato: userData.email
      } 

      const paciente = await this.pacienteService.findOrCreate(pacienteDto) //criação do paciente, caso nao exista

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