import { DataSource } from 'typeorm';
import { Paciente } from './entities/paciente.entity';

export const PacientesProviders = [
    {
        provide: 'PACIENTE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Paciente),
        inject: ['DATA_SOURCE']
    }
];