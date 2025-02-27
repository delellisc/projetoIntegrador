import { Module } from '@nestjs/common';
import { EspecializacoesService } from './especializacoes.service';
import { EspecializacoesController } from './especializacoes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EspecializacoessProviders } from './especializacoes.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EspecializacoesController],
  providers: [
    ...EspecializacoessProviders,
    EspecializacoesService,
  ],
})
export class EspecializacoesModule {}
