"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecializacoessProviders = void 0;
const especializacoe_entity_1 = require("./entities/especializacoe.entity");
exports.EspecializacoessProviders = [
    {
        provide: 'ESPECIALIZACAO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(especializacoe_entity_1.Especializacao),
        inject: ['DATA_SOURCE']
    }
];
//# sourceMappingURL=especializacoes.providers.js.map