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
const profissionais_service_1 = require("./profissionais/profissionais.service");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService, pacientesService, profissionalService) {
        this.appService = appService;
        this.pacientesService = pacientesService;
        this.profissionalService = profissionalService;
    }
    async getPaciente(id) {
        const paciente = await this.pacientesService.findOne(id);
        return { paciente };
    }
    async getAgendamentos(session, res) {
        if (!session.user) {
            return res.redirect('/home');
        }
        const isProfissional = await this.profissionalService.isRegistered(session.user.matricula);
        const view = isProfissional ? 'pagina_agendamentos_profissional' : 'pagina_agendamentos_paciente';
        return res.render(view, { user: session.user, id: session.user.matricula });
    }
    getPerfil(session, res) {
        if (!session.user) {
            return res.redirect('/home');
        }
        return { user: session.user, message: 'perfil visualizado' };
    }
    getIndex() {
        return {};
    }
    getAdmin() {
        return {};
    }
};
exports.AppController = AppController;
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
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAgendamentos", null);
__decorate([
    (0, common_1.Get)('perfil'),
    (0, common_1.Render)('pagina_perfil'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPerfil", null);
__decorate([
    (0, common_1.Get)('home'),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.Render)('pagina_admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAdmin", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        pacientes_service_1.PacientesService,
        profissionais_service_1.ProfissionaisService])
], AppController);
//# sourceMappingURL=app.controller.js.map