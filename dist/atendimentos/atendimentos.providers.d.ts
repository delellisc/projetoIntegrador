import { DataSource } from 'typeorm';
import { Atendimento } from './entities/atendimento.entity';
export declare const AtendimentosProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Atendimento>;
    inject: string[];
}[];
