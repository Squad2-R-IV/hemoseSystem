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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = exports.adminOnlyMiddleware = exports.authMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const UserService_1 = require("../services/implementations/UserService");
const prisma_1 = __importDefault(require("../config/prisma"));
const prismaErrorHandler_1 = require("../utils/prismaErrorHandler");
dotenv.config();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);
    if (!authHeader) {
        res.status(401).json({ message: "Token não informado" });
        return;
    }
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
        res.status(401).json({ message: "Formato de token inválido" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        console.log("Decoded Token:", decoded);
        const userService = tsyringe_1.container.resolve(UserService_1.UserService);
        const user = yield userService.getById(decoded.id);
        if (!user) {
            res.status(403).json({ message: "Usuário não encontrado" });
            return;
        }
        const userRoles = yield userService.getUserRoles(user.id);
        req.user.roles = userRoles.map((role) => role.name);
        console.log("User Roles:", req.user.roles);
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Token inválido ou expirado" });
    }
});
exports.authMiddleware = authMiddleware;
const adminOnlyMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.roles.includes("admin")) {
        res.status(403).json({ message: "Acesso negado" });
        return;
    }
    next();
});
exports.adminOnlyMiddleware = adminOnlyMiddleware;
const checkPermission = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            console.log("Auth Header:", authHeader);
            if (!authHeader) {
                res.status(401).json({ message: "Token não informado" });
                return;
            }
            const token = authHeader.split(" ")[1];
            console.log("Token:", token);
            if (!token) {
                res.status(401).json({ message: "Formato de token inválido" });
                return;
            }
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.user = decoded;
                console.log("Decoded Token:", decoded);
            }
            catch (error) {
                console.error("Token verification error:", error);
                res.status(403).json({ message: "Token inválido ou expirado" });
                return;
            }
            const userService = tsyringe_1.container.resolve(UserService_1.UserService);
            const user = yield userService.getById(req.user.id);
            if (!user) {
                res.status(403).json({ message: "Usuário não encontrado" });
                return;
            }
            const userRoles = yield userService.getUserRoles(user.id);
            const roleIds = userRoles.map(role => role.id);
            try {
                const permissions = yield prisma_1.default.roleToPermission.findMany({
                    where: {
                        roleId: { in: roleIds },
                        permission: { name: permission }
                    },
                    include: { permission: true }
                });
                if (permissions.length === 0) {
                    res.status(403).json({ message: "Acesso negado" });
                    return;
                }
                next();
            }
            catch (error) {
                const handledError = (0, prismaErrorHandler_1.handlePrismaError)(error);
                console.error("Permission check error:", handledError);
                res.status(handledError.statusCode || 500).json({
                    message: handledError.message || "Erro ao verificar permissões"
                });
            }
        }
        catch (error) {
            console.error("Error in checkPermission middleware:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    });
};
exports.checkPermission = checkPermission;
