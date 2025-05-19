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
exports.PacienteEntity = void 0;
const classes_1 = require("@automapper/classes");
const agendamento_entity_1 = require("./agendamento.entity");
const client_1 = require("@prisma/client");
class PacienteEntity {
}
exports.PacienteEntity = PacienteEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], PacienteEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PacienteEntity.prototype, "nome_paciente", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], PacienteEntity.prototype, "dt_nascimento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PacienteEntity.prototype, "sexo", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PacienteEntity.prototype, "estado_civil", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PacienteEntity.prototype, "endereco", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PacienteEntity.prototype, "cpf", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PacienteEntity.prototype, "cpf_acompanhante", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [agendamento_entity_1.AgendamentoEntity]),
    __metadata("design:type", Array)
], PacienteEntity.prototype, "agendamentos", void 0);
