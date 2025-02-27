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
exports.EspecializacoesController = void 0;
const common_1 = require("@nestjs/common");
const especializacoes_service_1 = require("./especializacoes.service");
const create_especializacoe_dto_1 = require("./dto/create-especializacoe.dto");
const update_especializacoe_dto_1 = require("./dto/update-especializacoe.dto");
let EspecializacoesController = class EspecializacoesController {
    constructor(especializacoesService) {
        this.especializacoesService = especializacoesService;
    }
    create(createEspecializacoeDto) {
        return this.especializacoesService.create(createEspecializacoeDto);
    }
    findAll() {
        return this.especializacoesService.findAll();
    }
    findOne(id) {
        return this.especializacoesService.findOne(+id);
    }
    update(id, updateEspecializacoeDto) {
        return this.especializacoesService.update(+id, updateEspecializacoeDto);
    }
    remove(id) {
        return this.especializacoesService.remove(+id);
    }
};
exports.EspecializacoesController = EspecializacoesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_especializacoe_dto_1.CreateEspecializacoeDto]),
    __metadata("design:returntype", void 0)
], EspecializacoesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EspecializacoesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EspecializacoesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_especializacoe_dto_1.UpdateEspecializacoeDto]),
    __metadata("design:returntype", void 0)
], EspecializacoesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EspecializacoesController.prototype, "remove", null);
exports.EspecializacoesController = EspecializacoesController = __decorate([
    (0, common_1.Controller)('especializacoes'),
    __metadata("design:paramtypes", [especializacoes_service_1.EspecializacoesService])
], EspecializacoesController);
//# sourceMappingURL=especializacoes.controller.js.map