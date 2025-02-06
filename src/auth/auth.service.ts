import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  private readonly suapAuthUrl = 'https://suap.ifrn.edu.br/o/authorize/';
  private readonly suapTokenUrl = 'https://suap.ifrn.edu.br/o/token/';

  private readonly clientId = process.env.SUAP_CLIENT_ID;
  private readonly clientSecret = process.env.SUAP_CLIENT_SECRET;
  private readonly redirectUri = 'http://localhost:3000/auth/callback'; 

  //url de login
  getAuthUrl(): string {
    return `${this.suapAuthUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
  }

  //troca o código pelo token de acesso
  async exchangeCodeForToken(code: string): Promise<any> {
    try {
      const response = await axios.post(
        this.suapTokenUrl,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
      //retorna o token
      return response.data;  
    } catch (error) {
      throw new UnauthorizedException('Erro ao trocar código por token');
    }
  }
}
