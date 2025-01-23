import { DataSource } from 'typeorm';
import { Profissional } from './entities/profissionai.entity';
export declare const ProfissionaisProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Profissional>;
    inject: string[];
}[];
