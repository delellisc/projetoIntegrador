"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    root() {
        return { message: 'saude123' };
    }
    getAgendamentosProfisisonal() {
        return { id: 20231038060014 };
    }
    getAgendamentosPaciente() {
        return { id: 20231038060001 };
    }
    getPerfil() {
        return { message: 'perfil visualizado' };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('pagina_inicial_logado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
__decorate([
    (0, common_1.Get)('agendamentos/profissional'),
    (0, common_1.Render)('pagina_agendamentos_profissional'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAgendamentosProfisisonal", null);
__decorate([
    (0, common_1.Get)('agendamentos/paciente'),
    (0, common_1.Render)('pagina_agendamentos_paciente'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAgendamentosPaciente", null);
__decorate([
    (0, common_1.Get)('perfil'),
    (0, common_1.Render)('pagina_perfil'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPerfil", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map