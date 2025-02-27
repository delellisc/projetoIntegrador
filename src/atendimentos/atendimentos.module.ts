import { Module } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { AtendimentosController } from './atendimentos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AtendimentosProviders } from './atendimentos.providers';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
  imports: [DatabaseModule, PacientesModule],
  controllers: [AtendimentosController],
  providers: [
    ...AtendimentosProviders,
    AtendimentosService],
})
export class AtendimentosModule {}

