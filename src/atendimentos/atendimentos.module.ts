import { Module } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { AtendimentosController } from './atendimentos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AtendimentosProviders } from './atendimentos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AtendimentosController],
  providers: [
    ...AtendimentosProviders,
    AtendimentosService],
})
export class AtendimentosModule {}

