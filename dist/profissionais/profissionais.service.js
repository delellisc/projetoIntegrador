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
exports.ProfissionaisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ProfissionaisService = class ProfissionaisService {
    constructor(profissionalRepository) {
        this.profissionalRepository = profissionalRepository;
    }
    create(createProfissionaiDto) {
        const profissional = this.profissionalRepository.create(createProfissionaiDto);
        return this.profissionalRepository.save(profissional);
    }
    findAll() {
        return this.profissionalRepository.find();
    }
    findOne(id) {
        return this.profissionalRepository.findOne({ where: { id: String(id) } });
    }
    update(id, updateProfissionaiDto) {
        return this.profissionalRepository.update(id, updateProfissionaiDto);
    }
    async remove(id) {
        const profissional = await this.profissionalRepository.findOne({ where: { id: String(id) } });
        if (profissional) {
            return this.profissionalRepository.remove(profissional);
        }
        return null;
    }
    findAtendimentos(id) {
        return this.profissionalRepository
            .createQueryBuilder('profissional')
            .select([
            'profissional.id AS profissional_id',
            'profissional.nome AS profissional_nome',
            'profissional.registro_profissional AS profissional_registro',
            'profissional.status AS profissional_status',
            'atendimento.id AS atendimento_id',
            'atendimento.horario AS atendimento_horario',
            'atendimento.status AS atendimento_status',
            'paciente.id AS paciente_id',
            'paciente.nome AS paciente_nome',
            'paciente.data_nascimento AS paciente_data_nascimento',
        ])
            .innerJoin('atendimento', 'atendimento', 'atendimento."profissionalId" = profissional.id')
            .innerJoin('atendimento.pacientes', 'paciente')
            .where('profissional.id = :id', { id })
            .getRawMany();
    }
    async isRegistered(id) {
        const profissional = await this.profissionalRepository.findOne({ where: { id: String(id) } });
        return !!profissional;
    }
};
exports.ProfissionaisService = ProfissionaisService;
exports.ProfissionaisService = ProfissionaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROFISSIONAL_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProfissionaisService);
//# sourceMappingURL=profissionais.service.js.map