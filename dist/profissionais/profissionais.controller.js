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
exports.ProfissionaisController = void 0;
const common_1 = require("@nestjs/common");
const profissionais_service_1 = require("./profissionais.service");
const create_profissionai_dto_1 = require("./dto/create-profissionai.dto");
const update_profissionai_dto_1 = require("./dto/update-profissionai.dto");
let ProfissionaisController = class ProfissionaisController {
    constructor(profissionaisService) {
        this.profissionaisService = profissionaisService;
    }
    create(createProfissionaiDto) {
        return this.profissionaisService.create(createProfissionaiDto);
    }
    findAll() {
        return this.profissionaisService.findAll();
    }
    findOne(id) {
        return this.profissionaisService.findOne(+id);
    }
    update(id, updateProfissionaiDto) {
        return this.profissionaisService.update(+id, updateProfissionaiDto);
    }
    remove(id) {
        return this.profissionaisService.remove(+id);
    }
    findAtendimentos(id) {
        return this.profissionaisService.findAtendimentos(+id);
    }
};
exports.ProfissionaisController = ProfissionaisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profissionai_dto_1.CreateProfissionaiDto]),
    __metadata("design:returntype", void 0)
], ProfissionaisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfissionaisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfissionaisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profissionai_dto_1.UpdateProfissionaiDto]),
    __metadata("design:returntype", void 0)
], ProfissionaisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfissionaisController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/atendimentos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfissionaisController.prototype, "findAtendimentos", null);
exports.ProfissionaisController = ProfissionaisController = __decorate([
    (0, common_1.Controller)('profissionais'),
    __metadata("design:paramtypes", [profissionais_service_1.ProfissionaisService])
], ProfissionaisController);
//# sourceMappingURL=profissionais.controller.js.map