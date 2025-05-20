import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IUserService } from "../services/interfaces/IUserService";
import { CreateUserDto } from "../Dtos/User/CreateUser.dto";
import { UpdateUserDto } from "../Dtos/User/UpdateUser.dto";
import { ReadUserDto } from "../Dtos/User/ReadUser.dto";
import { plainToInstance } from "class-transformer";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { Role, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { RoleRepository } from "../repositories/implementations/RoleRepository";
import { UserToRoleRepository } from "../repositories/implementations/UserToRoleRepository";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";

dotenv.config();

@injectable()
export class UserController extends GenericController<User, CreateUserDto, UpdateUserDto, ReadUserDto> {
  constructor(
    @inject("UserService") private readonly userService: IUserService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      userService,
      CreateUserDto,
      UpdateUserDto,
      ReadUserDto,
      auditoriaService,
      "User" // Pass the table name explicitly
    );
  }

  async login(req: Request, res: Response): Promise<Response> {
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

    await this.userService.update(user.id, { refreshToken } as Partial<User>);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    return res.json({ token, refreshToken });
  }

  async handleRefreshToken(req: Request, res: Response): Promise<Response> {
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

    await this.userService.update(user.id, { refreshToken } as Partial<User>);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    return res.json({ token, refreshToken });
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return res.status(401).json({ message: "Nenhum refresh token encontrado" });
    }

    const user = await this.userService.findByRefreshToken(cookies.refreshToken);
    if (!user) {
      return res.status(403).json({ message: "Proibido." });
    }

    // Limpa o refreshToken no banco de dados
    await this.userService.update(user.id, { refreshToken: "" } as Partial<User>);

    // Limpa os cookies
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    return res.status(200).json({ message: "Logout realizado com sucesso" });
  }
  
  override async create(req: Request, res: Response): Promise<Response> {
    const dto: CreateUserDto = req.body;
    const createDto: User = {
      id: randomUUID(),
      name: dto.name,
      password: await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUNDS as string)),
      email: dto.email,
      cpf: dto.cpf,
      contato: dto.contato,
      status: "A",
      especialidade: dto.especialidade || "",
      conselho: dto.conselho || "",
      registro: dto.registro || "",
      refreshToken: "",
    };
    const newItem = await this.userService.create(createDto);
    const userToRoleRepository = container.resolve(UserToRoleRepository);
    const roleRepository = container.resolve(RoleRepository);
    let roleDto = "semRole";
    if (dto.roles && dto.roles.length > 0) {
      roleDto = dto.roles[0];
    }
    const role = await roleRepository.findByField("name", roleDto);
    if (!role) {
      return res.status(404).json({ message: "Role padrão não encontrada, informe ao administrador do sistema" });
    }
    await userToRoleRepository.create({ userId: newItem.id, roleId: role.id });
    const readDto = plainToInstance(ReadUserDto, newItem);
    return res.status(201).json(readDto);
  }

  async changeUserRoles(req: Request, res: Response): Promise<Response> {
    const { userId, roles } = req.body;
    const user = await this.userService.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await this.userService.updateUserRoles(userId, roles);
    return res.status(200).json({ message: "Roles atualizadas com sucesso" });
  }

  async getMedicos(req: Request, res: Response): Promise<Response> {
    const medicos = await this.userService.getUsersByRole("medico");
    const readDto = medicos.map((medico) => plainToInstance(ReadUserDto, medico));
    return res.status(200).json(readDto);
  }

  async getEnfermeiros(req: Request, res: Response): Promise<Response> {
    const enfermeiros = await this.userService.getUsersByRole("enfermeiro");
    const readDto = enfermeiros.map((enfermeiro) => plainToInstance(ReadUserDto, enfermeiro));
    return res.status(200).json(readDto);
  }

  async getRecepcionistas(req: Request, res: Response): Promise<Response> {
    const recepcionistas = await this.userService.getUsersByRole("recepcionista");
    const readDto = recepcionistas.map((recepcionista) => plainToInstance(ReadUserDto, recepcionista));
    return res.status(200).json(readDto);
  }

  async getDentistas(req: Request, res: Response): Promise<Response> {
    const dentistas = await this.userService.getUsersByRole("dentista");
    const readDto = dentistas.map((dentista) => plainToInstance(ReadUserDto, dentista));
    return res.status(200).json(readDto);
  }

  async getFisioterapeutas(req: Request, res: Response): Promise<Response> {
    const fisioterapeutas = await this.userService.getUsersByRole("fisioterapeuta");
    const readDto = fisioterapeutas.map((fisioterapeuta) => plainToInstance(ReadUserDto, fisioterapeuta));
    return res.status(200).json(readDto);
  }

  async getGestores(req: Request, res: Response): Promise<Response> {
    const gestores = await this.userService.getUsersByRole("gestor");
    const readDto = gestores.map((gestor) => plainToInstance(ReadUserDto, gestor));
    return res.status(200).json(readDto);
  }
  
  async getNutricionistas(req: Request, res: Response): Promise<Response> {
    const nutricionistas = await this.userService.getUsersByRole("nutricionista");
    const readDto = nutricionistas.map((nutricionista) => plainToInstance(ReadUserDto, nutricionista));
    return res.status(200).json(readDto);
  }

  
}