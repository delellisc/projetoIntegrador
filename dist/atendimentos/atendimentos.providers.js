"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtendimentosProviders = void 0;
const atendimento_entity_1 = require("./entities/atendimento.entity");
exports.AtendimentosProviders = [
    {
        provide: 'ATENDIMENTO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(atendimento_entity_1.Atendimento),
        inject: ['DATA_SOURCE']
    }
];
//# sourceMappingURL=atendimentos.providers.js.map