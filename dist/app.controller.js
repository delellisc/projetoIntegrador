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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const pacientes_service_1 = require("./pacientes/pacientes.service");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService, pacientesService) {
        this.appService = appService;
        this.pacientesService = pacientesService;
    }
    root() {
        return { msg1: 'Campanha de vacinação do dia 08/06 ao dia 18/06!!',
            msg2: 'Procure a unidade de saúde do seu bairro para se vacinar!'
        };
    }
    async getPaciente(id) {
        const paciente = await this.pacientesService.findOne(id);
        const atendimentos = await this.pacientesService.findAtendimentos(id);
        const atendimentosFormatted = atendimentos.map(atendimento => ({
            status: atendimento.status,
            horario: new Date(atendimento.horario).toLocaleString(),
            profissional: atendimento.profissional ? atendimento.profissional.nome : '',
        }));
        return { paciente, atendimentos: atendimentosFormatted };
    }
    getAgendamentos() {
        return { message: 'atendimento é bom' };
    }
    getPerfil() {
        return { message: 'perfil visualizado' };
    }
    getHistorico() {
        return { message: 'aqui está o historico' };
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
    (0, common_1.Get)('paciente/:id'),
    (0, common_1.Render)('pagina_inicial_logado'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPaciente", null);
__decorate([
    (0, common_1.Get)('agendamentos'),
    (0, common_1.Render)('pagina_agendamentos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAgendamentos", null);
__decorate([
    (0, common_1.Get)('perfil'),
    (0, common_1.Render)('pagina_perfil'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPerfil", null);
__decorate([
    (0, common_1.Get)('historico'),
    (0, common_1.Render)('pagina_historico'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHistorico", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        pacientes_service_1.PacientesService])
], AppController);
//# sourceMappingURL=app.controller.js.map