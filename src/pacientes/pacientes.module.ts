import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PacientesProviders } from './pacientes.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PacientesController],
  providers: [
    ... PacientesProviders,
    PacientesService
  ],
  exports: [
    ... PacientesProviders,
    PacientesService
  ],
})
export class PacientesModule {}
