import { Module } from '@nestjs/common';
import { EspecializacoesService } from './especializacoes.service';
import { EspecializacoesController } from './especializacoes.controller';

@Module({
  controllers: [EspecializacoesController],
  providers: [EspecializacoesService],
})
export class EspecializacoesModule {}
