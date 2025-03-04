"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionaisModule = void 0;
const common_1 = require("@nestjs/common");
const profissionais_service_1 = require("./profissionais.service");
const profissionais_controller_1 = require("./profissionais.controller");
const database_module_1 = require("../database/database.module");
const profissionais_providers_1 = require("./profissionais.providers");
let ProfissionaisModule = class ProfissionaisModule {
};
exports.ProfissionaisModule = ProfissionaisModule;
exports.ProfissionaisModule = ProfissionaisModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [profissionais_controller_1.ProfissionaisController],
        providers: [
            ...profissionais_providers_1.ProfissionaisProviders,
            profissionais_service_1.ProfissionaisService
        ],
        exports: [profissionais_service_1.ProfissionaisService]
    })
], ProfissionaisModule);
//# sourceMappingURL=profissionais.module.js.map