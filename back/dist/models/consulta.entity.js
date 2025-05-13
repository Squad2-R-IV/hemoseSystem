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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaEntity = void 0;
const classes_1 = require("@automapper/classes");
const client_1 = require("@prisma/client");
const agendamento_entity_1 = require("./agendamento.entity");
const anamnese_entity_1 = require("./anamnese.entity");
const conduta_entity_1 = require("./conduta.entity");
class ConsultaEntity {
}
exports.ConsultaEntity = ConsultaEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ConsultaEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ConsultaEntity.prototype, "id_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ConsultaEntity.prototype, "procedimento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], ConsultaEntity.prototype, "dt_entrada", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ConsultaEntity.prototype, "dt_saida", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ConsultaEntity.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ConsultaEntity.prototype, "observacoes", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => agendamento_entity_1.AgendamentoEntity),
    __metadata("design:type", agendamento_entity_1.AgendamentoEntity)
], ConsultaEntity.prototype, "Agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => anamnese_entity_1.AnamneseEntity),
    __metadata("design:type", anamnese_entity_1.AnamneseEntity)
], ConsultaEntity.prototype, "Anamnese", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [conduta_entity_1.CondutaEntity]),
    __metadata("design:type", Array)
], ConsultaEntity.prototype, "Condutas", void 0);
