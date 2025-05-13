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
exports.UserEntity = void 0;
const classes_1 = require("@automapper/classes");
const userToRole_entity_1 = require("./userToRole.entity");
const agendamento_entity_1 = require("./agendamento.entity");
const auditoria_entity_1 = require("./auditoria.entity");
const anamnese_entity_1 = require("./anamnese.entity");
class UserEntity {
}
exports.UserEntity = UserEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "cpf", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "contato", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "especialidade", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "conselho", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "registro", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [userToRole_entity_1.UserToRoleEntity]),
    __metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [agendamento_entity_1.AgendamentoEntity]),
    __metadata("design:type", Array)
], UserEntity.prototype, "agendamentos", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [auditoria_entity_1.AuditoriaEntity]),
    __metadata("design:type", Array)
], UserEntity.prototype, "auditorias", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [anamnese_entity_1.AnamneseEntity]),
    __metadata("design:type", Array)
], UserEntity.prototype, "Anamneses", void 0);
