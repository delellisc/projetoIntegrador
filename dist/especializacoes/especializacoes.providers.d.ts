import { DataSource } from 'typeorm';
import { Especializacao } from './entities/especializacoe.entity';
export declare const EspecializacoessProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Especializacao>;
    inject: string[];
}[];
