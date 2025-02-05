import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { EspecializacoesModule } from './especializacoes/especializacoes.module';

@Module({
  imports: [PacientesModule, ProfissionaisModule, AtendimentosModule, EspecializacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
