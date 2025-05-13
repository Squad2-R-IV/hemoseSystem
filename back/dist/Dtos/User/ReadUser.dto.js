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
exports.ReadUserDto = void 0;
const classes_1 = require("@automapper/classes");
const ReadAgendamentoDto_1 = require("../Agendamento/ReadAgendamentoDto");
const ReadAnamneseDto_1 = require("../Anamnese/ReadAnamneseDto");
class ReadUserDto {
}
exports.ReadUserDto = ReadUserDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "email", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "cpf", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "contato", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "especialidade", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "conselho", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadUserDto.prototype, "registro", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [ReadAgendamentoDto_1.ReadAgendamentoDto]),
    __metadata("design:type", Array)
], ReadUserDto.prototype, "agendamentos", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [ReadAnamneseDto_1.ReadAnamneseDto]),
    __metadata("design:type", Array)
], ReadUserDto.prototype, "Anamneses", void 0);
