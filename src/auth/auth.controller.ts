import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
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
  async callback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      return res.status(400).json({ error: 'Código de autorização ausente' });
    }

    try {
      const tokenData = await this.authService.exchangeCodeForToken(code);
      return res.json(tokenData);
    } catch (error) {
      return res.status(401).json({ error: 'Falha ao autenticar' });
    }
  }
}
