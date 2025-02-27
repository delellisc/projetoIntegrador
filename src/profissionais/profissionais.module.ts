import { Module } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { ProfissionaisController } from './profissionais.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProfissionaisProviders } from './profissionais.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfissionaisController],
  providers: [
    ...ProfissionaisProviders,
    ProfissionaisService
  ],
  exports: [ProfissionaisService]
})
export class ProfissionaisModule {}
