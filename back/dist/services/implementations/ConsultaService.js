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
exports.ConsultaService = void 0;
const tsyringe_1 = require("tsyringe");
const GenericService_1 = require("./GenericService");
const ConsultaRepository_1 = require("../../repositories/implementations/ConsultaRepository");
let ConsultaService = class ConsultaService extends GenericService_1.GenericService {
    constructor(consultaRepository) {
        super(consultaRepository);
    }
    async getConsultasByPacientId(pacienteId) {
        return await this.repository.findManyByQuery({
            where: {
                Agendamento: {
                    id_paciente: pacienteId
                }
            },
            include: {
                Anamnese: true,
                Agendamento: {
                    include: {
                        Paciente: true,
                        Usuario: true
                    }
                },
                Condutas: true,
                Evolucoes: true,
            }
        }, true);
    }
};
exports.ConsultaService = ConsultaService;
exports.ConsultaService = ConsultaService = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.registry)([
        {
            token: 'ConsultaService',
            useClass: ConsultaService
        },
    ]),
    __param(0, (0, tsyringe_1.inject)("ConsultaRepository")),
    __metadata("design:paramtypes", [ConsultaRepository_1.ConsultaRepository])
], ConsultaService);
//# sourceMappingURL=ConsultaService.js.map