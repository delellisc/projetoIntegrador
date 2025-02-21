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
exports.AtendimentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AtendimentosService = class AtendimentosService {
    constructor(atendimentoRepository) {
        this.atendimentoRepository = atendimentoRepository;
    }
    create(createAtendimentoDto) {
        const atendimento = this.atendimentoRepository.create(createAtendimentoDto);
        return this.atendimentoRepository.save(atendimento);
    }
    findAll() {
        return this.atendimentoRepository.find();
    }
    findOne(id) {
        return this.atendimentoRepository.findOne({ where: { id: id } });
    }
    update(id, updateAtendimentoDto) {
        return this.atendimentoRepository.update(id, updateAtendimentoDto);
    }
    async remove(id) {
        const atendimento = await this.atendimentoRepository.findOne({ where: { id: id } });
        if (atendimento) {
            return this.atendimentoRepository.remove(atendimento);
        }
        return null;
    }
    async removeByDate(data) {
        let dataConvertida = new Date(data);
        const atendimento = await this.atendimentoRepository.findOne({ where: { horario: dataConvertida } });
        if (atendimento) {
            return this.atendimentoRepository.remove(atendimento);
        }
        return null;
    }
    findAtendimentoByDate(data) {
        return this.atendimentoRepository
            .createQueryBuilder('atendimento')
            .select([
            'atendimento.id AS atendimento_id',
            'atendimento.horario AS atendimento_horario',
            'atendimento.status AS atendimento_status',
            'profissional.id AS profissional_id',
            'profissional.nome AS profissional_nome',
            'profissional.registro_profissional AS profissional_registro',
            'profissional.status AS profissional_status',
            'especializacao.nome AS especializacao_nome',
        ])
            .innerJoin('atendimento.profissional', 'profissional')
            .innerJoin('profissional.especializacao', 'especializacao')
            .where('DATE(atendimento.horario) = :data', { data })
            .getRawMany();
    }
    findAtendimentoByHour(data) {
        return this.atendimentoRepository
            .createQueryBuilder('atendimento')
            .select([
            'atendimento.id AS atendimento_id',
            'profissional.id AS profissional_id'
        ])
            .innerJoin('atendimento.profissional', 'profissional')
            .where('atendimento.horario = :data', { data })
            .getRawOne();
    }
};
exports.AtendimentosService = AtendimentosService;
exports.AtendimentosService = AtendimentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ATENDIMENTO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AtendimentosService);
//# sourceMappingURL=atendimentos.service.js.map