"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
const db = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.USER_PASSWORD;
const hostname = process.env.HOST_NAME;
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
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
//# sourceMappingURL=database.providers.js.map