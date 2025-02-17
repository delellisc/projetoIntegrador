import { Controller, Get, Query, Redirect, Res, Req, Session, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //redireciona para o login do 
  @Get('login')
  @Redirect()
  login() {
    return { url: this.authService.getAuthUrl() };
  }

  //troca o codigo pego token 
  @Get('callback')
  async callback(
    @Query('code') code: string, 
    @Query('client_id') client_id: string, 
    // @Req() request: Request,
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


      // console.log("token recebido:", token);//depuração

      const userData = await this.authService.getUserData(token);
      console.log(userData)
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


// https//suap.ifrn.edu.br/accounts/login/?next=/o/authorize/%3Fresponse_type%3Dcode%26client_id%3DRx7Yys13JyLNdtYbG7Wz70OrWLy3C4ZdiNC95Oqw%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fauth%252Fcallback