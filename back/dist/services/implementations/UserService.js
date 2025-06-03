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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const GenericService_1 = require("./GenericService");
const prisma_1 = __importDefault(require("../../config/prisma")); // Importa a instância do Prisma configurada
const UserRepository_1 = require("../../repositories/implementations/UserRepository");
const UserToRoleRepository_1 = require("../../repositories/implementations/UserToRoleRepository");
const RoleRepository_1 = require("../../repositories/implementations/RoleRepository");
let UserService = class UserService extends GenericService_1.GenericService {
    constructor(userRepository) {
        super(userRepository);
    }
    async findByRefreshToken(refreshToken) {
        const user = await this.repository.findByFields([{ field: 'refreshToken', value: refreshToken }]);
        return user;
    }
    async findByEmail(email) {
        const user = await this.repository.findByFields([{ field: 'email', value: email }]);
        return user;
    }
    async getUserRoles(userId) {
        const userToRoleRepository = tsyringe_1.container.resolve(UserToRoleRepository_1.UserToRoleRepository);
        const roleRepository = tsyringe_1.container.resolve(RoleRepository_1.RoleRepository);
        const userToRoles = await userToRoleRepository.findManyByFields([{ field: 'userId', value: userId }]);
        const userRoles = [];
        for (const userToRole of userToRoles) {
            const role = await roleRepository.findById(userToRole.roleId);
            if (role) {
                userRoles.push(role);
            }
        }
        return userRoles;
    }
    async updateUserRoles(userId, roles) {
        const roleRepository = tsyringe_1.container.resolve(RoleRepository_1.RoleRepository);
        // Verificar se todas as roles existem
        const reqRoles = roles.map(async (role) => {
            const roleRecord = await roleRepository.findByField("name", role);
            if (!roleRecord) {
                throw new Error(`Role ${role} não encontrada`);
            }
            return roleRecord;
        });
        const rolesRecords = await Promise.all(reqRoles);
        // Deletar as roles atuais do usuário
        await prisma_1.default.userToRole.deleteMany({
            where: { userId }
        });
        // Inserir as novas roles
        const userToRoleData = rolesRecords.map(role => ({
            userId,
            roleId: role.id
        }));
        await prisma_1.default.userToRole.createMany({
            data: userToRoleData
        });
    }
    async getUsersByRole(roleName) {
        const roleRepository = tsyringe_1.container.resolve(RoleRepository_1.RoleRepository);
        const userToRoleRepository = tsyringe_1.container.resolve(UserToRoleRepository_1.UserToRoleRepository);
        const role = await roleRepository.findByField("name", roleName);
        if (!role) {
            throw new Error(`Role ${roleName} não encontrada`);
        }
        const userToRoles = await userToRoleRepository.findManyByFields([{ field: "roleId", value: role.id }]);
        const userIds = userToRoles.map(userToRole => userToRole.userId);
        const users = await prisma_1.default.user.findMany({
            where: { id: { in: userIds } },
        });
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.registry)([
        {
            token: 'UserService',
            useClass: UserService
        },
    ]),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserService);
//# sourceMappingURL=UserService.js.map