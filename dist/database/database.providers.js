"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
const paciente_entity_1 = require("../pacientes/entities/paciente.entity");
const profissionai_entity_1 = require("../profissionais/entities/profissionai.entity");
const atendimento_entity_1 = require("../atendimentos/entities/atendimento.entity");
const especializacoe_entity_1 = require("../especializacoes/entities/especializacoe.entity");
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
                entities: [paciente_entity_1.Paciente, profissionai_entity_1.Profissional, atendimento_entity_1.Atendimento, especializacoe_entity_1.Especializacao],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map