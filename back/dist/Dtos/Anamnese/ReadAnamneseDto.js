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
exports.ReadAnamneseDto = void 0;
const classes_1 = require("@automapper/classes");
const ReadConsultaDto_1 = require("../Consulta/ReadConsultaDto");
const ReadUser_dto_1 = require("../User/ReadUser.dto");
class ReadAnamneseDto {
}
exports.ReadAnamneseDto = ReadAnamneseDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadAnamneseDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadAnamneseDto.prototype, "id_consulta", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadAnamneseDto.prototype, "id_funcionario", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ReadAnamneseDto.prototype, "cid", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "queixa_principal", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "historia_doenca_atual", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "antecedentes_pessoais", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "antecedentes_familiares", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "habitos_vida", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "medicamentos_em_uso", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "alergias", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "cirurgias_previas", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], ReadAnamneseDto.prototype, "observacoes", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadConsultaDto_1.ReadConsultaDto),
    __metadata("design:type", ReadConsultaDto_1.ReadConsultaDto)
], ReadAnamneseDto.prototype, "Consulta", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => ReadUser_dto_1.ReadUserDto),
    __metadata("design:type", ReadUser_dto_1.ReadUserDto)
], ReadAnamneseDto.prototype, "User", void 0);
