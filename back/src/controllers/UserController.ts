import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IUserService } from "../services/interfaces/IUserService";
import { User } from "@prisma/client";
import { UserService } from "../services/implementations/UserService";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

@injectable()
export class UserController extends GenericController<User> {
  constructor(@inject("UserService") private readonly userService: UserService) {
    super(userService);
  }

  handleLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user: User | null = await this.userService.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Invalid password" });
      }

      if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined");
      }

      const accessToken = jwt.sign(
        { email: user.email, id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { email: user.email, id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "2d" }
      );

      const updatedUser = { ...user, refreshToken, password: undefined };
      await this.userService.update(user.id, updatedUser);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error: any) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
      }

      // Verifica se o e-mail já está cadastrado
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash da senha antes de salvar no banco
      const hashedPassword = await bcrypt.hash(password, 10);

      const user: User = {
        id: "",
        name,
        email,
        password: hashedPassword,
        refreshToken: "",
      };
      // Criar usuário no banco
      const newUser = await this.userService.create(user);

      // Gerar tokens JWT
      if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined");
      }

      const accessToken = jwt.sign(
        { email: newUser.email, id: newUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { email: newUser.email, id: newUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "2d" }
      );

      // Atualizar usuário com o refresh token
      await this.userService.update(newUser.id, { refreshToken });

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error("User creation error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
