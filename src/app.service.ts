import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from './auth/auth.service'; 

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  getHello(): string {
    return 'TESTE';
  }
  async getSuapUserProfile(token: string): Promise<any> {
    try {
      const response = await axios.get('https://suap.ifrn.edu.br/api/v2/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Falha ao buscar perfil do SUAP');
    }
  }

  async getTokenFromAuthCode(code: string): Promise<any> {
    try {
      // return await this.authService.exchangeCodeForToken(code);
    } catch (error) {
      throw new Error('Erro ao obter token');
    }
  }
}