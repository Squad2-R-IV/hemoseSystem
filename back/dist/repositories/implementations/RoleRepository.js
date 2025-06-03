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
exports.RoleRepository = void 0;
const tsyringe_1 = require("tsyringe");
const GenericRepository_1 = require("./GenericRepository");
const prisma_1 = __importDefault(require("../../config/prisma"));
let RoleRepository = class RoleRepository extends GenericRepository_1.GenericRepository {
    constructor() {
        super(prisma_1.default, prisma_1.default.role, ['users', 'permissions']);
    }
    async findById(id, includeRelations = false) {
        if (includeRelations) {
            return await prisma_1.default.role.findUnique({
                where: { id },
                include: {
                    users: {
                        include: {
                            user: true
                        }
                    },
                    permissions: {
                        include: {
                            permission: true
                        }
                    }
                }
            });
        }
        return await prisma_1.default.role.findUnique({
            where: { id }
        });
    }
    async findAll(includeRelations = false) {
        if (includeRelations) {
            return await prisma_1.default.role.findMany({
                include: {
                    users: {
                        include: {
                            user: true
                        }
                    },
                    permissions: {
                        include: {
                            permission: true
                        }
                    }
                }
            });
        }
        return await prisma_1.default.role.findMany();
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.registry)([
        {
            token: 'RoleRepository',
            useClass: RoleRepository
        },
    ]),
    __metadata("design:paramtypes", [])
], RoleRepository);
//# sourceMappingURL=RoleRepository.js.map