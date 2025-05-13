"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const GenericController_1 = require("./GenericController");
const user_entity_1 = require("../models/user.entity");
const CreateUser_dto_1 = require("../Dtos/User/CreateUser.dto");
const UpdateUser_dto_1 = require("../Dtos/User/UpdateUser.dto");
const ReadUser_dto_1 = require("../Dtos/User/ReadUser.dto");
const class_transformer_1 = require("class-transformer");
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const RoleRepository_1 = require("../repositories/implementations/RoleRepository");
const UserToRoleRepository_1 = require("../repositories/implementations/UserToRoleRepository");
const AuditoriaService_1 = require("../services/implementations/AuditoriaService");
dotenv.config();
let UserController = class UserController extends GenericController_1.GenericController {
    constructor(userService, auditoriaService) {
        super(userService, user_entity_1.UserEntity, CreateUser_dto_1.CreateUserDto, UpdateUser_dto_1.UpdateUserDto, ReadUser_dto_1.ReadUserDto, auditoriaService);
        this.userService = userService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield this.userService.findByEmail(email);
            if (!user)
                return res.status(404).json({ message: "Usuário não encontrado" });
            const matchPassword = yield bcrypt.compare(password, user.password);
            if (!matchPassword)
                return res.status(401).json({ message: "Senha inválida" });
            const userRoles = yield this.userService.getUserRoles(user.id);
            const token = jwt.sign({ id: user.id, roles: userRoles.map((role) => role.name) }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
            yield this.userService.update(user.id, { refreshToken });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
            res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
            return res.json({ token, refreshToken });
        });
    }
    handleRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookies = req.cookies;
            if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken))
                return res.status(401).json({ message: "Nenhum refresh token encontrado" });
            const user = yield this.userService.findByRefreshToken(cookies.refreshToken);
            if (!user)
                return res.status(403).json({ message: "Proibido." });
            let decodedUser;
            let errorJwt;
            jwt.verify(cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err)
                    errorJwt = err;
                decodedUser = decoded;
            });
            if (errorJwt || user.id !== decodedUser.id)
                return res.status(403).json({ message: "Proibido." });
            const userRoles = yield this.userService.getUserRoles(user.id);
            const token = jwt.sign({ id: user.id, roles: userRoles.map((role) => role.name) }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
            yield this.userService.update(user.id, { refreshToken });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
            res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
            return res.json({ token, refreshToken });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookies = req.cookies;
            if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
                return res.status(401).json({ message: "Nenhum refresh token encontrado" });
            }
            const user = yield this.userService.findByRefreshToken(cookies.refreshToken);
            if (!user) {
                return res.status(403).json({ message: "Proibido." });
            }
            // Limpa o refreshToken no banco de dados
            yield this.userService.update(user.id, { refreshToken: "" });
            // Limpa os cookies
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
            res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
            return res.status(200).json({ message: "Logout realizado com sucesso" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const createDto = (0, class_transformer_1.plainToInstance)(user_entity_1.UserEntity, dto);
            createDto.password = yield bcrypt.hash(createDto.password, parseInt(process.env.SALT_ROUNDS));
            createDto.id = (0, crypto_1.randomUUID)();
            createDto.status = "A";
            createDto.roles = undefined; // Limpa a propriedade roles para evitar que ela seja salva no banco de dados
            const newItem = yield this.userService.create(createDto);
            const userToRoleRepository = tsyringe_1.container.resolve(UserToRoleRepository_1.UserToRoleRepository);
            const roleRepository = tsyringe_1.container.resolve(RoleRepository_1.RoleRepository);
            let roleDto = "semRole";
            if (dto.roles && dto.roles.length > 0) {
                roleDto = dto.roles[0];
            }
            const role = yield roleRepository.findByField("name", roleDto);
            if (!role) {
                return res.status(404).json({ message: "Role padrão não encontrada, informe ao administrador do sistema" });
            }
            yield userToRoleRepository.create({ userId: newItem.id, roleId: role.id });
            const readDto = (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, newItem);
            return res.status(201).json(readDto);
        });
    }
    changeUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, roles } = req.body;
            const user = yield this.userService.getById(userId);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            yield this.userService.updateUserRoles(userId, roles);
            return res.status(200).json({ message: "Roles atualizadas com sucesso" });
        });
    }
    getMedicos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicos = yield this.userService.getUsersByRole("medico");
            const readDto = medicos.map((medico) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, medico));
            return res.status(200).json(readDto);
        });
    }
    getEnfermeiros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const enfermeiros = yield this.userService.getUsersByRole("enfermeiro");
            const readDto = enfermeiros.map((enfermeiro) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, enfermeiro));
            return res.status(200).json(readDto);
        });
    }
    getRecepcionistas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recepcionistas = yield this.userService.getUsersByRole("recepcionista");
            const readDto = recepcionistas.map((recepcionista) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, recepcionista));
            return res.status(200).json(readDto);
        });
    }
    getDentistas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dentistas = yield this.userService.getUsersByRole("dentista");
            const readDto = dentistas.map((dentista) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, dentista));
            return res.status(200).json(readDto);
        });
    }
    getFisioterapeutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fisioterapeutas = yield this.userService.getUsersByRole("fisioterapeuta");
            const readDto = fisioterapeutas.map((fisioterapeuta) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, fisioterapeuta));
            return res.status(200).json(readDto);
        });
    }
    getGestores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gestores = yield this.userService.getUsersByRole("gestor");
            const readDto = gestores.map((gestor) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, gestor));
            return res.status(200).json(readDto);
        });
    }
    getNutricionistas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutricionistas = yield this.userService.getUsersByRole("nutricionista");
            const readDto = nutricionistas.map((nutricionista) => (0, class_transformer_1.plainToInstance)(ReadUser_dto_1.ReadUserDto, nutricionista));
            return res.status(200).json(readDto);
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserService")),
    __param(1, (0, tsyringe_1.inject)(AuditoriaService_1.AuditoriaService)),
    __metadata("design:paramtypes", [Object, Object])
], UserController);
