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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteController = void 0;
const tsyringe_1 = require("tsyringe");
const GenericController_1 = require("./GenericController");
const paciente_entity_1 = require("../models/paciente.entity");
const CreatePacienteDto_1 = require("../Dtos/Paciente/CreatePacienteDto");
const UpdatePacienteDto_1 = require("../Dtos/Paciente/UpdatePacienteDto");
const ReadPacienteDto_1 = require("../Dtos/Paciente/ReadPacienteDto");
const PacienteService_1 = require("../services/implementations/PacienteService");
const AuditoriaService_1 = require("../services/implementations/AuditoriaService");
let PacienteController = class PacienteController extends GenericController_1.GenericController {
    constructor(pacienteService, auditoriaService) {
        super(pacienteService, paciente_entity_1.PacienteEntity, CreatePacienteDto_1.CreatePacienteDto, UpdatePacienteDto_1.UpdatePacienteDto, ReadPacienteDto_1.ReadPacienteDto, auditoriaService);
        this.pacienteService = pacienteService;
    }
    findPacienteByCpf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf } = req.params;
            const paciente = yield this.pacienteService.findPacienteByCpf(cpf);
            if (!paciente) {
                return res.status(404).json({
                    titulo: "Paciente Não Encontrado",
                    mensagem: "Não foi possível encontrar um paciente com este CPF"
                });
            }
            return res.json(paciente);
        });
    }
};
exports.PacienteController = PacienteController;
exports.PacienteController = PacienteController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(PacienteService_1.PacienteService)),
    __param(1, (0, tsyringe_1.inject)(AuditoriaService_1.AuditoriaService)),
    __metadata("design:paramtypes", [Object, Object])
], PacienteController);
