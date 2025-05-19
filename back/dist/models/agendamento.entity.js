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
exports.AgendamentoEntity = void 0;
const classes_1 = require("@automapper/classes");
const client_1 = require("@prisma/client");
const consulta_entity_1 = require("./consulta.entity");
const paciente_entity_1 = require("./paciente.entity");
const user_entity_1 = require("./user.entity");
class AgendamentoEntity {
}
exports.AgendamentoEntity = AgendamentoEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], AgendamentoEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], AgendamentoEntity.prototype, "id_paciente", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AgendamentoEntity.prototype, "id_funcionario", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AgendamentoEntity.prototype, "dt_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], AgendamentoEntity.prototype, "dt_hora_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AgendamentoEntity.prototype, "dt_chegada", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AgendamentoEntity.prototype, "tipo_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AgendamentoEntity.prototype, "status_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AgendamentoEntity.prototype, "observacoes", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => paciente_entity_1.PacienteEntity),
    __metadata("design:type", paciente_entity_1.PacienteEntity)
], AgendamentoEntity.prototype, "Paciente", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], AgendamentoEntity.prototype, "Usuario", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => consulta_entity_1.ConsultaEntity),
    __metadata("design:type", consulta_entity_1.ConsultaEntity)
], AgendamentoEntity.prototype, "Consulta", void 0);
