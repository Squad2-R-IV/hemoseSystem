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
exports.ReadConsultaDto = void 0;
const classes_1 = require("@automapper/classes");
const client_1 = require("@prisma/client");
const ReadAnamneseDto_1 = require("../Anamnese/ReadAnamneseDto");
const ReadAgendamentoDto_1 = require("../Agendamento/ReadAgendamentoDto");
const ReadCondutaDto_1 = require("../Conduta/ReadCondutaDto");
class ReadConsultaDto {
}
exports.ReadConsultaDto = ReadConsultaDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadConsultaDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadConsultaDto.prototype, "id_agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadConsultaDto.prototype, "procedimento", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], ReadConsultaDto.prototype, "dt_entrada", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadConsultaDto.prototype, "dt_saida", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadConsultaDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadConsultaDto.prototype, "observacoes", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadAnamneseDto_1.ReadAnamneseDto),
    __metadata("design:type", ReadAnamneseDto_1.ReadAnamneseDto)
], ReadConsultaDto.prototype, "Anamnese", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadAgendamentoDto_1.ReadAgendamentoDto),
    __metadata("design:type", ReadAgendamentoDto_1.ReadAgendamentoDto)
], ReadConsultaDto.prototype, "Agendamento", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [ReadCondutaDto_1.ReadCondutaDto]),
    __metadata("design:type", Array)
], ReadConsultaDto.prototype, "Condutas", void 0);
