import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';

@Module({
  imports: [PacientesModule, ProfissionaisModule, AtendimentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
