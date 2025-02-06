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
      // Aqui você pode usar o token para fazer uma requisição autenticada ao SUAP
      const response = await axios.get('https://suap.ifrn.edu.br/api/v2/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Retorna o perfil do usuário autenticado
    } catch (error) {
      throw new Error('Falha ao buscar perfil do SUAP');
    }
  }

  // Caso você queira implementar algum tipo de lógica adicional com o token ou outro dado
  async getTokenFromAuthCode(code: string): Promise<any> {
    try {
      // Usa o AuthService para obter o token a partir do código de autorização
      return await this.authService.exchangeCodeForToken(code);
    } catch (error) {
      throw new Error('Erro ao obter token');
    }
  }
}