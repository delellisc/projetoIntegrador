import { DataSource } from 'typeorm';
import { Especializacao } from './entities/especializacoe.entity';

export const EspecializacoessProviders = [
    {
        provide: 'ESPECIALIZACAO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Especializacao),
        inject: ['DATA_SOURCE']
    }
];