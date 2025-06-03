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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaService = void 0;
const tsyringe_1 = require("tsyringe");
const GenericService_1 = require("./GenericService");
const AuditoriaRepository_1 = require("../../repositories/implementations/AuditoriaRepository");
let AuditoriaService = class AuditoriaService extends GenericService_1.GenericService {
    constructor(auditoriaRepository) {
        super(auditoriaRepository); // Pass auditoriaService to super
    }
};
exports.AuditoriaService = AuditoriaService;
exports.AuditoriaService = AuditoriaService = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.registry)([
        {
            token: 'AuditoriaService',
            useClass: AuditoriaService
        },
    ]),
    __param(0, (0, tsyringe_1.inject)("AuditoriaRepository")),
    __metadata("design:paramtypes", [AuditoriaRepository_1.AuditoriaRepository])
], AuditoriaService);
//# sourceMappingURL=AuditoriaService.js.map