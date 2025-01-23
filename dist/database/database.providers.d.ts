import { DataSource } from 'typeorm';
import 'dotenv/config';
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<DataSource>;
}[];
