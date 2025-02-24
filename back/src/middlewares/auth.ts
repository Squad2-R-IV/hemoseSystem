import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/implementations/UserService";
import { User } from "@prisma/client";

dotenv.config();

interface JwtPayload {
    id: string;
    roles: string[];    
}

// Estendendo a interface Request para incluir a propriedade user
declare module "express" {
    interface Request {
        user?: JwtPayload;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        req.user = decoded;
        console.log("Decoded Token:", decoded);

        const userService = container.resolve(UserService);
        const user = await userService.getById(decoded.id);
        if (!user) {
            res.status(403).json({ message: "Usuário não encontrado" });
            return;
        }
        const userRoles = await userService.getUserRoles(user.id);
        req.user.roles = userRoles.map((role) => role.name);
        console.log("User Roles:", req.user.roles);
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Token inválido ou expirado" });
    }
};

export const adminOnlyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user || !req.user.roles.includes("admin")) {
        res.status(403).json({ message: "Acesso negado" });
        return;
    }
    next();
};
