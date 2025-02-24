import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IUserService } from "../services/interfaces/IUserService";
import { User } from "@prisma/client";
import { UserService } from "../services/implementations/UserService";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";

dotenv.config();

@injectable()
export class UserController extends GenericController<User> {
  constructor(@inject("UserService") private readonly userService: UserService) {
    super(userService);
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) return res.status(401).json({ message: "Senha inválida" });
      const userRoles = await this.userService.getUserRoles(user.id);
      const token = jwt.sign({ id: user.id, roles: userRoles.map((role) => role.name)}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1d" });
      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
      await this.userService.update(user.id, { refreshToken: refreshToken });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      return res.json({ token, refreshToken });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { password, ...rest } = req.body;

      // Hash da senha antes de salvar no banco
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criação do novo usuário com a senha hash
      const newUser = await this.userService.create({ ...rest, password: hashedPassword });

      return res.status(201).json(newUser);
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
      let token;
      let refreshToken;
      let decodedUser: any;
      let errorJwt;
      jwt.verify(cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
        if (err) errorJwt = err;
        decodedUser = decoded
      });

      if (errorJwt || user.id !== decodedUser.id) return res.status(403).json({ message: "Proibido." });
      const userRoles = await this.userService.getUserRoles(user.id);
      token = jwt.sign({ id: user.id, roles: userRoles.map((role) => role.name)}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1d" });
      refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
      await this.userService.update(user.id, { refreshToken: refreshToken });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      return res.json({ token, refreshToken });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    console.log("logout");
    try {
      const cookies = req.cookies;
      console.log("Cookies:", cookies);
      console.log("Refresh Token:", cookies?.refreshToken);
      
      if (!cookies?.refreshToken) {
        return res.status(401).json({ message: "Nenhum refresh token encontrado" });
      }
      const user = await this.userService.findByRefreshToken(cookies.refreshToken);
      if (!user) {
        return res.status(403).json({ message: "Proibido." });
      }
  
      // Limpa o refreshToken no banco de dados
      await this.userService.update(user.id, { refreshToken: "" });
  
      // Limpa os cookies
      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  
      // Retorna uma resposta de sucesso
      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error: any) {
      console.error("Erro durante o logout:", error);
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