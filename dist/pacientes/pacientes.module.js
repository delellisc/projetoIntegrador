"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacientesModule = void 0;
const common_1 = require("@nestjs/common");
const pacientes_service_1 = require("./pacientes.service");
const pacientes_controller_1 = require("./pacientes.controller");
const database_module_1 = require("../database/database.module");
const pacientes_providers_1 = require("./pacientes.providers");
let PacientesModule = class PacientesModule {
};
exports.PacientesModule = PacientesModule;
exports.PacientesModule = PacientesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pacientes_controller_1.PacientesController],
        providers: [
            ...pacientes_providers_1.PacientesProviders,
            pacientes_service_1.PacientesService
        ],
        exports: [
            ...pacientes_providers_1.PacientesProviders,
            pacientes_service_1.PacientesService
        ],
    })
], PacientesModule);
//# sourceMappingURL=pacientes.module.js.map