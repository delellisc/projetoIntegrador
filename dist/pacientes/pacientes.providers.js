"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacientesProviders = void 0;
const paciente_entity_1 = require("./entities/paciente.entity");
exports.PacientesProviders = [
    {
        provide: 'PACIENTE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(paciente_entity_1.Paciente),
        inject: ['DATA_SOURCE']
    }
];
//# sourceMappingURL=pacientes.providers.js.map