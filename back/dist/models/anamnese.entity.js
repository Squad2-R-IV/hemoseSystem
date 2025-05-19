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
exports.AnamneseEntity = void 0;
const classes_1 = require("@automapper/classes");
const consulta_entity_1 = require("./consulta.entity");
const user_entity_1 = require("./user.entity");
class AnamneseEntity {
}
exports.AnamneseEntity = AnamneseEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], AnamneseEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], AnamneseEntity.prototype, "id_consulta", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AnamneseEntity.prototype, "id_funcionario", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AnamneseEntity.prototype, "cid", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "queixa_principal", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "historia_doenca_atual", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "antecedentes_pessoais", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "antecedentes_familiares", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "habitos_vida", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "medicamentos_em_uso", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "alergias", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "cirurgias_previas", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], AnamneseEntity.prototype, "observacoes", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => consulta_entity_1.ConsultaEntity),
    __metadata("design:type", consulta_entity_1.ConsultaEntity)
], AnamneseEntity.prototype, "Consulta", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], AnamneseEntity.prototype, "User", void 0);
