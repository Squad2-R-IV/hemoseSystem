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
exports.CondutaController = void 0;
const tsyringe_1 = require("tsyringe");
const GenericController_1 = require("./GenericController");
const conduta_entity_1 = require("../models/conduta.entity");
const CreateCondutaDto_1 = require("../Dtos/Conduta/CreateCondutaDto");
const UpdateCondutaDto_1 = require("../Dtos/Conduta/UpdateCondutaDto");
const ReadCondutaDto_1 = require("../Dtos/Conduta/ReadCondutaDto");
const CondutaService_1 = require("../services/implementations/CondutaService");
const AuditoriaService_1 = require("../services/implementations/AuditoriaService");
let CondutaController = class CondutaController extends GenericController_1.GenericController {
    constructor(condutaService, auditoriaService) {
        super(condutaService, conduta_entity_1.CondutaEntity, CreateCondutaDto_1.CreateCondutaDto, UpdateCondutaDto_1.UpdateCondutaDto, ReadCondutaDto_1.ReadCondutaDto, auditoriaService);
        this.condutaService = condutaService;
    }
    getCondutasByConsultaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
            const consultaId = parseInt(req.query.consultaId);
            if (isNaN(consultaId)) {
                return res.status(400).json({ message: "consultaId deve ser um número válido" });
            }
            const condutas = yield this.condutaService.getCondutasByConsultaId(Number(consultaId));
            return res.json(condutas);
        });
    }
};
exports.CondutaController = CondutaController;
exports.CondutaController = CondutaController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(CondutaService_1.CondutaService)),
    __param(1, (0, tsyringe_1.inject)(AuditoriaService_1.AuditoriaService)),
    __metadata("design:paramtypes", [Object, Object])
], CondutaController);
