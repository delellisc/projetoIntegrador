import { DataSource } from 'typeorm';
import 'dotenv/config';

const db = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.USER_PASSWORD;
const hostname = process.env.HOST_NAME;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: hostname,
        port: 5432,
        username: user,
        password: password,
        database: db,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];