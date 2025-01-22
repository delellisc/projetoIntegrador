import { Module } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { ProfissionaisController } from './profissionais.controller';

@Module({
  controllers: [ProfissionaisController],
  providers: [ProfissionaisService],
})
export class ProfissionaisModule {}
