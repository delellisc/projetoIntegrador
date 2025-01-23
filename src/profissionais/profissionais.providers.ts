import { DataSource } from 'typeorm';
import { Profissional } from './entities/profissionai.entity';

export const ProfissionaisProviders = [
    {
        provide: 'PROFISSIONAL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Profissional),
        inject: ['DATA_SOURCE']
    }
];