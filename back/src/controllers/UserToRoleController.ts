import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateUserToRoleDto } from "../Dtos/UserToRole/CreateUserToRoleDto";
import { UpdateUserToRoleDto } from "../Dtos/UserToRole/UpdateUserToRoleDto";
import { ReadUserToRoleDto } from "../Dtos/UserToRole/ReadUserToRoleDto";
import { IUserToRoleService } from "../services/interfaces/IUserToRoleService";
import { UserToRoleService } from "../services/implementations/UserToRoleService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { UserToRole } from "@prisma/client";

@injectable()
export class UserToRoleController extends GenericController<
  UserToRole,
  CreateUserToRoleDto,
  UpdateUserToRoleDto,
  ReadUserToRoleDto
> {
  constructor(
    @inject(UserToRoleService) private readonly userToRoleService: IUserToRoleService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      userToRoleService,
      CreateUserToRoleDto,
      UpdateUserToRoleDto,
      ReadUserToRoleDto,
      auditoriaService,
      "UserToRole"
    );
  }

  async getRolesByUserId(req: Request, res: Response): Promise<Response> {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }
    const roles = await this.userToRoleService.getRolesByUserId(userId);
    return res.json(roles);
  }

  async getUsersByRoleId(req: Request, res: Response): Promise<Response> {
    const roleId = req.query.roleId as string;
    if (!roleId) {
      return res.status(400).json({ message: "roleId é obrigatório" });
    }
    const users = await this.userToRoleService.getUsersByRoleId(roleId);
    return res.json(users);
  }
}
