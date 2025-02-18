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
exports.Especializacao = void 0;
const typeorm_1 = require("typeorm");
const profissionai_entity_1 = require("../../profissionais/entities/profissionai.entity");
let Especializacao = class Especializacao {
};
exports.Especializacao = Especializacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Especializacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Especializacao.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => profissionai_entity_1.Profissional, (profissional) => profissional.especializacao),
    __metadata("design:type", Array)
], Especializacao.prototype, "profissionais", void 0);
exports.Especializacao = Especializacao = __decorate([
    (0, typeorm_1.Entity)('especializacao')
], Especializacao);
//# sourceMappingURL=especializacoe.entity.js.map