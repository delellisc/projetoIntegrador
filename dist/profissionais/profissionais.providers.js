"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionaisProviders = void 0;
const profissionai_entity_1 = require("./entities/profissionai.entity");
exports.ProfissionaisProviders = [
    {
        provide: 'PROFISSIONAL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(profissionai_entity_1.Profissional),
        inject: ['DATA_SOURCE']
    }
];
//# sourceMappingURL=profissionais.providers.js.map