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
exports.Atendimento = void 0;
const typeorm_1 = require("typeorm");
const paciente_entity_1 = require("../../pacientes/entities/paciente.entity");
const profissionai_entity_1 = require("../../profissionais/entities/profissionai.entity");
let Atendimento = class Atendimento {
};
exports.Atendimento = Atendimento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Atendimento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Atendimento.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Atendimento.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Atendimento.prototype, "qtd_pacientes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => paciente_entity_1.Paciente, (paciente) => paciente.atendimentos),
    (0, typeorm_1.JoinTable)({ name: "consultas" }),
    __metadata("design:type", Array)
], Atendimento.prototype, "pacientes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profissionai_entity_1.Profissional, (profissional) => profissional.id),
    __metadata("design:type", profissionai_entity_1.Profissional)
], Atendimento.prototype, "profissional", void 0);
exports.Atendimento = Atendimento = __decorate([
    (0, typeorm_1.Entity)('atendimento')
], Atendimento);
//# sourceMappingURL=atendimento.entity.js.map