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
exports.AgendamentoController = void 0;
const tsyringe_1 = require("tsyringe");
const GenericController_1 = require("./GenericController");
const CreateAgendamentoDto_1 = require("../Dtos/Agendamento/CreateAgendamentoDto");
const UpdateAgendamentoDto_1 = require("../Dtos/Agendamento/UpdateAgendamentoDto");
const ReadAgendamentoDto_1 = require("../Dtos/Agendamento/ReadAgendamentoDto");
const AgendamentoService_1 = require("../services/implementations/AgendamentoService");
const AuditoriaService_1 = require("../services/implementations/AuditoriaService");
let AgendamentoController = class AgendamentoController extends GenericController_1.GenericController {
    constructor(agendamentoService, auditoriaService) {
        super(agendamentoService, CreateAgendamentoDto_1.CreateAgendamentoDto, UpdateAgendamentoDto_1.UpdateAgendamentoDto, ReadAgendamentoDto_1.ReadAgendamentoDto, auditoriaService, "Agendamento" // Pass the table name explicitly
        );
        this.agendamentoService = agendamentoService;
    }
    async getAgendamentosComConsultasAtivas(req, res) {
        const agendamentos = await this.agendamentoService.getAgendamentosComConsultasAtivas();
        return res.json(agendamentos);
    }
    async getAgendamentosNaEnfermaria(req, res) {
        const agendamentos = await this.agendamentoService.getAgendamentosNaEnfermaria();
        return res.json(agendamentos);
    }
    async getAgendamentosByDate(req, res) {
        const { date } = req.params;
        if (!date) {
            return res.status(400).json({ message: 'Data não informada' });
        }
        const dateObject = new Date(date);
        // Check if date is valid
        if (isNaN(dateObject.getTime())) {
            return res.status(400).json({ message: 'Data inválida' });
        }
        const agendamentos = await this.agendamentoService.getAgendamentosByDate(dateObject);
        return res.json(agendamentos);
    }
};
exports.AgendamentoController = AgendamentoController;
exports.AgendamentoController = AgendamentoController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AgendamentoService_1.AgendamentoService)),
    __param(1, (0, tsyringe_1.inject)(AuditoriaService_1.AuditoriaService)),
    __metadata("design:paramtypes", [Object, Object])
], AgendamentoController);
//# sourceMappingURL=AgendamentoController.js.map