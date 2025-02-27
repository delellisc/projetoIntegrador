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
exports.AtendimentosController = void 0;
const common_1 = require("@nestjs/common");
const atendimentos_service_1 = require("./atendimentos.service");
const create_atendimento_dto_1 = require("./dto/create-atendimento.dto");
const update_atendimento_dto_1 = require("./dto/update-atendimento.dto");
let AtendimentosController = class AtendimentosController {
    constructor(atendimentosService) {
        this.atendimentosService = atendimentosService;
    }
    create(createAtendimentoDto) {
        return this.atendimentosService.create(createAtendimentoDto);
    }
    findAll() {
        return this.atendimentosService.findAll();
    }
    findOne(id) {
        return this.atendimentosService.findOne(+id);
    }
    update(id, updateAtendimentoDto) {
        return this.atendimentosService.update(+id, updateAtendimentoDto);
    }
    remove(id) {
        return this.atendimentosService.remove(+id);
    }
    removeAtendimentoByDate(horario) {
        return this.atendimentosService.removeByDate(horario);
    }
    findAtendimentoByDate(date) {
        return this.atendimentosService.findAtendimentoByDate(date);
    }
    findAtendimentoByHour(horario) {
        return this.atendimentosService.findAtendimentoByHour(horario);
    }
    createConsulta(body) {
        return this.atendimentosService.createConsulta(body.atendimentoId, body.pacienteId);
    }
    findConsulta(atendimentoId, pacienteId) {
        return this.atendimentosService.findConsulta(atendimentoId, pacienteId);
    }
    removeConsulta(atendimentoId, pacienteId) {
        return this.atendimentosService.removeConsulta(atendimentoId, pacienteId);
    }
    findPacientes(id) {
        return this.atendimentosService.findPacientes(id);
    }
};
exports.AtendimentosController = AtendimentosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_atendimento_dto_1.CreateAtendimentoDto]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_atendimento_dto_1.UpdateAtendimentoDto]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('/data/:horario'),
    __param(0, (0, common_1.Param)('horario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "removeAtendimentoByDate", null);
__decorate([
    (0, common_1.Get)('/data/:date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "findAtendimentoByDate", null);
__decorate([
    (0, common_1.Get)('/horario/:horario'),
    __param(0, (0, common_1.Param)('horario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "findAtendimentoByHour", null);
__decorate([
    (0, common_1.Post)('/consultas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "createConsulta", null);
__decorate([
    (0, common_1.Get)('/consultas/:atendimentoId/:pacienteId'),
    __param(0, (0, common_1.Param)('atendimentoId')),
    __param(1, (0, common_1.Param)('pacienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "findConsulta", null);
__decorate([
    (0, common_1.Delete)('/removerConsulta/:atendimentoId/:pacienteId'),
    __param(0, (0, common_1.Param)('atendimentoId')),
    __param(1, (0, common_1.Param)('pacienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "removeConsulta", null);
__decorate([
    (0, common_1.Get)('/:id/pacientes'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AtendimentosController.prototype, "findPacientes", null);
exports.AtendimentosController = AtendimentosController = __decorate([
    (0, common_1.Controller)('atendimentos'),
    __metadata("design:paramtypes", [atendimentos_service_1.AtendimentosService])
], AtendimentosController);
//# sourceMappingURL=atendimentos.controller.js.map