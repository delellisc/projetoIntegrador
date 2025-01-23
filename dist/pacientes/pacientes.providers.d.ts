import { DataSource } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
export declare const PacientesProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Paciente>;
    inject: string[];
}[];
