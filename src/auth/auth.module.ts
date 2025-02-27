import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PacientesModule } from '../pacientes/pacientes.module';
import { ProfissionaisModule } from '../profissionais/profissionais.module';

@Module({
  imports: [PacientesModule, ProfissionaisModule],
  controllers: [AuthController], //controle de rotas autenticação
  providers: [AuthService], //lógicas de validação do usuário e requisições
  exports: [AuthService] //exporta o AuthService para ser usado em outros módulos  
})
export class AuthModule {}
