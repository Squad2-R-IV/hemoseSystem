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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaRepository = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = __importDefault(require("../../config/prisma"));
const GenericRepository_1 = require("./GenericRepository");
let AuditoriaRepository = class AuditoriaRepository extends GenericRepository_1.GenericRepository {
    constructor() {
        super(prisma_1.default, prisma_1.default.auditoria, ['Usuario']);
    }
};
exports.AuditoriaRepository = AuditoriaRepository;
exports.AuditoriaRepository = AuditoriaRepository = __decorate([
    (0, tsyringe_1.registry)([
        {
            token: 'AuditoriaRepository',
            useClass: AuditoriaRepository,
        },
    ]),
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AuditoriaRepository);
//# sourceMappingURL=AuditoriaRepository.js.map