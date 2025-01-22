"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionaisService = void 0;
const common_1 = require("@nestjs/common");
let ProfissionaisService = class ProfissionaisService {
    create(createProfissionaiDto) {
        return 'This action adds a new profissionai';
    }
    findAll() {
        return `This action returns all profissionais`;
    }
    findOne(id) {
        return `This action returns a #${id} profissionai`;
    }
    update(id, updateProfissionaiDto) {
        return `This action updates a #${id} profissionai`;
    }
    remove(id) {
        return `This action removes a #${id} profissionai`;
    }
};
exports.ProfissionaisService = ProfissionaisService;
exports.ProfissionaisService = ProfissionaisService = __decorate([
    (0, common_1.Injectable)()
], ProfissionaisService);
//# sourceMappingURL=profissionais.service.js.map