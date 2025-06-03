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
exports.AgendamentoService = void 0;
const tsyringe_1 = require("tsyringe");
const GenericService_1 = require("./GenericService");
const AgendamentoRepository_1 = require("../../repositories/implementations/AgendamentoRepository");
let AgendamentoService = class AgendamentoService extends GenericService_1.GenericService {
    constructor(agendamentoRepository) {
        super(agendamentoRepository);
    }
    async getAgendamentosNaEnfermaria() {
        return await this.repository.findManyByQuery({
            where: {
                Consulta: {
                    status: {
                        in: ['ENFERMARIA', 'AGUARDANDO_ACOLHIMENTO']
                    }
                }
            },
            include: {
                Consulta: true,
                Paciente: true,
                Usuario: true
            }
        }, true); // Cast the result to AgendamentoWithRelations[]
    }
    async getAgendamentosComConsultasAtivas() {
        return await this.repository.findManyByQuery({
            where: {
                Consulta: {
                    status: {
                        in: ['AGUARDANDO', 'EM_ATENDIMENTO', 'CHAMADO', 'ENFERMARIA', 'AGUARDANDO_ACOLHIMENTO']
                    }
                }
            },
            include: {
                Consulta: true,
                Paciente: true,
                Usuario: true
            }
        }, true); // Cast the result to AgendamentoWithRelations[]
    }
    async getAgendamentosByDate(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const nextDay = new Date(startOfDay);
        nextDay.setDate(nextDay.getDate() + 1); // Dia seguinte, à meia-noite
        return await this.repository.findManyByQuery({
            where: {
                dt_agendamento: {
                    gte: startOfDay,
                    lt: nextDay,
                }
            },
            include: {
                Consulta: true,
                Paciente: true,
                Usuario: true
            }
        }, true);
    }
};
exports.AgendamentoService = AgendamentoService;
exports.AgendamentoService = AgendamentoService = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.registry)([
        {
            token: 'AgendamentoService',
            useClass: AgendamentoService
        },
    ]),
    __param(0, (0, tsyringe_1.inject)("AgendamentoRepository")),
    __metadata("design:paramtypes", [AgendamentoRepository_1.AgendamentoRepository])
], AgendamentoService);
//# sourceMappingURL=AgendamentoService.js.map