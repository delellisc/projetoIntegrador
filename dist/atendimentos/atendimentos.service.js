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
    constructor(atendimentoRepository, pacienteRepository) {
        this.atendimentoRepository = atendimentoRepository;
        this.pacienteRepository = pacienteRepository;
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
            'atendimento.qtd_pacientes AS qtd_pacientes'
        ])
            .innerJoin('atendimento.profissional', 'profissional')
            .innerJoin('profissional.especializacao', 'especializacao')
            .where('DATE(atendimento.horario) = :data', { data })
            .orderBy('atendimento.horario')
            .getRawMany();
    }
    findAtendimentoByHour(data) {
        return this.atendimentoRepository
            .createQueryBuilder('atendimento')
            .select([
            'atendimento.id AS atendimento_id',
            'profissional.id AS profissional_id',
            'atendimento.qtd_pacientes AS qtd_pacientes'
        ])
            .innerJoin('atendimento.profissional', 'profissional')
            .where('atendimento.horario = :data', { data })
            .getRawOne();
    }
    async createConsulta(atendimentoId, pacienteId) {
        const atendimento = await this.atendimentoRepository.findOne({
            where: { id: atendimentoId },
            relations: ['pacientes'],
        });
        if (!atendimento) {
            throw new Error('Atendimento not found');
        }
        const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
        if (!paciente) {
            throw new Error('Paciente not found');
        }
        if (!atendimento.pacientes.some(p => p.id === pacienteId)) {
            atendimento.pacientes.push(paciente);
            await this.atendimentoRepository.save(atendimento);
        }
        return atendimento;
    }
    async findConsulta(atendimentoId, pacienteId) {
        const atendimento = await this.atendimentoRepository.findOne({
            where: { id: atendimentoId },
            relations: ['pacientes'],
        });
        if (!atendimento) {
            throw new Error('Atendimento not found');
        }
        const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
        if (!paciente) {
            throw new Error('Paciente not found');
        }
        if (atendimento.pacientes.some(p => p.id === pacienteId)) {
            return atendimento;
        }
        return;
    }
    async removeConsulta(atendimentoId, pacienteId) {
        const atendimento = await this.atendimentoRepository.findOne({
            where: { id: atendimentoId },
            relations: ['pacientes'],
        });
        if (!atendimento) {
            throw new Error('Atendimento not found');
        }
        const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
        if (!paciente) {
            throw new Error('Paciente not found');
        }
        atendimento.pacientes = atendimento.pacientes.filter(p => p.id !== pacienteId);
        return await this.atendimentoRepository.save(atendimento);
    }
    async findPacientes(id) {
        const atendimento = await this.atendimentoRepository.findOne({ where: { id: id }, relations: ['pacientes'] });
        if (!atendimento) {
            throw new Error('Atendimento not found');
        }
        return atendimento.pacientes;
    }
};
exports.AtendimentosService = AtendimentosService;
exports.AtendimentosService = AtendimentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ATENDIMENTO_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PACIENTE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AtendimentosService);
//# sourceMappingURL=atendimentos.service.js.map