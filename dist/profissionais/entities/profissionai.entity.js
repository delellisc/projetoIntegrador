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
exports.Profissional = void 0;
const typeorm_1 = require("typeorm");
const especializacoe_entity_1 = require("../../especializacoes/entities/especializacoe.entity");
let Profissional = class Profissional {
};
exports.Profissional = Profissional;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], Profissional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profissional.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profissional.prototype, "registro_profissional", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profissional.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especializacoe_entity_1.Especializacao, (especializacao) => especializacao.profissionais),
    __metadata("design:type", especializacoe_entity_1.Especializacao)
], Profissional.prototype, "especializacao", void 0);
exports.Profissional = Profissional = __decorate([
    (0, typeorm_1.Entity)('profissional')
], Profissional);
//# sourceMappingURL=profissionai.entity.js.map