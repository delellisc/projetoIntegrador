import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController], //controle de rotas autenticação
  providers: [AuthService], //lógicas de validação do usuário e requisições
  exports: [AuthService] //exporta o AuthService para ser usado em outros módulos  
})
export class AuthModule {}
