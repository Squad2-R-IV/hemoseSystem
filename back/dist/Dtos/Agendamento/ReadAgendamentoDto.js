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
exports.ReadAgendamentoDto = void 0;
const classes_1 = require("@automapper/classes");
const client_1 = require("@prisma/client");
const ReadPacienteDto_1 = require("../Paciente/ReadPacienteDto");
const ReadUser_dto_1 = require("../User/ReadUser.dto");
const ReadConsultaDto_1 = require("../Consulta/ReadConsultaDto");
class ReadAgendamentoDto {
}
exports.ReadAgendamentoDto = ReadAgendamentoDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadAgendamentoDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadAgendamentoDto.prototype, "id_paciente", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadAgendamentoDto.prototype, "id_funcionario", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], ReadAgendamentoDto.prototype, "dt_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadAgendamentoDto.prototype, "dt_hora_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAgendamentoDto.prototype, "dt_chegada", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadAgendamentoDto.prototype, "tipo_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadAgendamentoDto.prototype, "status_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadAgendamentoDto.prototype, "observacoes", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadPacienteDto_1.ReadPacienteDto),
    __metadata("design:type", ReadPacienteDto_1.ReadPacienteDto)
], ReadAgendamentoDto.prototype, "Paciente", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadUser_dto_1.ReadUserDto),
    __metadata("design:type", ReadUser_dto_1.ReadUserDto)
], ReadAgendamentoDto.prototype, "Usuario", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadConsultaDto_1.ReadConsultaDto),
    __metadata("design:type", ReadConsultaDto_1.ReadConsultaDto)
], ReadAgendamentoDto.prototype, "Consulta", void 0);
