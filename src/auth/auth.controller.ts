import { Controller, Get, Query, Redirect, Res, Session, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //redireciona para o login do 
  @Get('login')
  @Redirect() // Redireciona automaticamente
  login() {
    return { url: this.authService.getAuthUrl() };
  }

  //troca o codigo pego token 
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
      const user = await this.authService.getUserData(token.access_token);
      session.token = token;
      session.user = user;

      console.log("token recebido:", token);//depuração

      const userData = await this.authService.getUserData(token);
      session.user = userData; //armazena os dados do usuário na sessão
      

      return res.render('pagina_inicial_logado', {usuario: userData});
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
