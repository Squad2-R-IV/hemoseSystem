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
exports.ConsultaController = void 0;
const tsyringe_1 = require("tsyringe");
const GenericController_1 = require("./GenericController");
const consulta_entity_1 = require("../models/consulta.entity");
const CreateConsultaDto_1 = require("../Dtos/Consulta/CreateConsultaDto");
const UpdateConsultaDto_1 = require("../Dtos/Consulta/UpdateConsultaDto");
const ReadConsultaDto_1 = require("../Dtos/Consulta/ReadConsultaDto");
const ConsultaService_1 = require("../services/implementations/ConsultaService");
const AuditoriaService_1 = require("../services/implementations/AuditoriaService");
let ConsultaController = class ConsultaController extends GenericController_1.GenericController {
    constructor(consultaService, auditoriaService) {
        super(consultaService, consulta_entity_1.ConsultaEntity, CreateConsultaDto_1.CreateConsultaDto, UpdateConsultaDto_1.UpdateConsultaDto, ReadConsultaDto_1.ReadConsultaDto, auditoriaService);
        this.consultaService = consultaService;
    }
};
exports.ConsultaController = ConsultaController;
exports.ConsultaController = ConsultaController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ConsultaService_1.ConsultaService)),
    __param(1, (0, tsyringe_1.inject)(AuditoriaService_1.AuditoriaService)),
    __metadata("design:paramtypes", [Object, Object])
], ConsultaController);
