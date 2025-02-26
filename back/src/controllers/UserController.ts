import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IUserService } from "../services/interfaces/IUserService";
import { UserEntity } from "../models/user.entity";
import { CreateUserDto } from "../Dtos/User/CreateUser.dto";
import { UpdateUserDto } from "../Dtos/User/UpdateUser.dto";
import { ReadUserDto } from "../Dtos/User/ReadUser.dto";
import { mapper } from "../mappings/mapper";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";

dotenv.config();

@injectable()
export class UserController extends GenericController<UserEntity, CreateUserDto, UpdateUserDto, ReadUserDto> {
  constructor(
    @inject("UserService") private readonly userService: IUserService,
  ) {
    super(userService, UserEntity, CreateUserDto, UpdateUserDto, ReadUserDto);
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) return res.status(401).json({ message: "Senha inválida" });

      const userRoles = await this.userService.getUserRoles(user.id);
      const token = jwt.sign(
        { id: user.id, roles: userRoles.map((role : Role) => role.name) },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      await this.userService.update(user.id, { refreshToken } as Partial<UserEntity>);
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

      return res.json({ token, refreshToken });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async handleRefreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) return res.status(401).json({ message: "Nenhum refresh token encontrado" });

      const user = await this.userService.findByRefreshToken(cookies.refreshToken);
      if (!user) return res.status(403).json({ message: "Proibido." });

      let decodedUser: any;
      let errorJwt: any;
      jwt.verify(
        cookies.refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err) errorJwt = err;
          decodedUser = decoded;
        }
      );

      if (errorJwt || user.id !== decodedUser.id) return res.status(403).json({ message: "Proibido." });

      const userRoles = await this.userService.getUserRoles(user.id);
      const token = jwt.sign(
        { id: user.id, roles: userRoles.map((role : Role) => role.name) },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      await this.userService.update(user.id, { refreshToken } as Partial<UserEntity>);
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

      return res.json({ token, refreshToken });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) {
        return res.status(401).json({ message: "Nenhum refresh token encontrado" });
      }

      const user = await this.userService.findByRefreshToken(cookies.refreshToken);
      if (!user) {
        return res.status(403).json({ message: "Proibido." });
      }

      // Limpa o refreshToken no banco de dados
      await this.userService.update(user.id, { refreshToken: "" } as Partial<UserEntity>);

      // Limpa os cookies
      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async changeUserRoles(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, roles } = req.body;
      const user = await this.userService.getById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await this.userService.updateUserRoles(userId, roles);
      return res.status(200).json({ message: "Roles atualizadas com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}