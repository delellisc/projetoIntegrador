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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let PacientesService = class PacientesService {
    constructor(pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }
    async findOrCreate(createPacienteDto) {
        let paciente = await this.pacienteRepository.findOne({ where: { id: createPacienteDto.id } });
        if (!paciente) {
            paciente = this.pacienteRepository.create(createPacienteDto);
            await this.pacienteRepository.save(paciente);
        }
        return paciente;
    }
    create(createPacienteDto) {
        const paciente = this.pacienteRepository.create(createPacienteDto);
        return this.pacienteRepository.save(paciente);
    }
    findAll() {
        return this.pacienteRepository.find();
    }
    findOne(id) {
        return this.pacienteRepository.findOne({ where: { id: id } });
    }
    update(id, updatePacienteDto) {
        return this.pacienteRepository.update(id, updatePacienteDto);
    }
    async remove(id) {
        const paciente = await this.pacienteRepository.findOne({ where: { id: id } });
        if (paciente) {
            return this.pacienteRepository.remove(paciente);
        }
        return null;
    }
    findAtendimentos(id) {
        return this.pacienteRepository
            .createQueryBuilder('paciente')
            .select([
            'atendimento.id AS atendimento_id',
            'atendimento.horario AS atendimento_horario',
            'profissional.nome AS profissional_nome',
            'profissional.registro_profissional AS profissional_registro',
            'especializacao.nome AS especializacao_nome'
        ])
            .innerJoin('paciente.atendimentos', 'atendimento')
            .innerJoin('atendimento.profissional', 'profissional')
            .innerJoin('profissional.especializacao', 'especializacao')
            .where('paciente.id = :id', { id })
            .andWhere('atendimento.horario < CURRENT_TIMESTAMP')
            .orderBy('atendimento.horario', 'DESC')
            .getRawMany();
    }
    findUpcomingAtendimentos(id) {
        return this.pacienteRepository
            .createQueryBuilder('paciente')
            .select([
            'atendimento.id AS atendimento_id',
            'atendimento.horario AS atendimento_horario',
            'profissional.nome AS profissional_nome',
            'profissional.registro_profissional AS profissional_registro',
            'especializacao.nome AS especializacao_nome'
        ])
            .innerJoin('paciente.atendimentos', 'atendimento')
            .innerJoin('atendimento.profissional', 'profissional')
            .innerJoin('profissional.especializacao', 'especializacao')
            .where('paciente.id = :id', { id })
            .andWhere('atendimento.horario > CURRENT_TIMESTAMP')
            .orderBy('atendimento.horario', 'ASC')
            .getRawMany();
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PACIENTE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PacientesService);
//# sourceMappingURL=pacientes.service.js.map