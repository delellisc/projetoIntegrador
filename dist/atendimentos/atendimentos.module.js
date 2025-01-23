"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtendimentosModule = void 0;
const common_1 = require("@nestjs/common");
const atendimentos_service_1 = require("./atendimentos.service");
const atendimentos_controller_1 = require("./atendimentos.controller");
const database_module_1 = require("../database/database.module");
const atendimentos_providers_1 = require("./atendimentos.providers");
let AtendimentosModule = class AtendimentosModule {
};
exports.AtendimentosModule = AtendimentosModule;
exports.AtendimentosModule = AtendimentosModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [atendimentos_controller_1.AtendimentosController],
        providers: [
            ...atendimentos_providers_1.AtendimentosProviders,
            atendimentos_service_1.AtendimentosService
        ],
    })
], AtendimentosModule);
//# sourceMappingURL=atendimentos.module.js.map