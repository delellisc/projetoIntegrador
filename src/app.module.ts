import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { EspecializacoesModule } from './especializacoes/especializacoes.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [PacientesModule, ProfissionaisModule, AtendimentosModule, EspecializacoesModule, AuthModule, HttpModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
