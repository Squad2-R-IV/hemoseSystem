import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateRoleDto } from "../Dtos/Role/CreateRoleDto";
import { UpdateRoleDto } from "../Dtos/Role/UpdateRoleDto";
import { ReadRoleDto } from "../Dtos/Role/ReadRoleDto";
import { IRoleService } from "../services/interfaces/IRoleService";
import { RoleService } from "../services/implementations/RoleService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { Role } from "@prisma/client";

@injectable()
export class RoleController extends GenericController<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  ReadRoleDto
> {
  constructor(
    @inject(RoleService) private readonly roleService: IRoleService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      roleService,
      CreateRoleDto,
      UpdateRoleDto,
      ReadRoleDto,
      auditoriaService,
      "Role"
    );
  }

  async getRolesByUserId(req: Request, res: Response): Promise<Response> {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }
    const roles = await this.roleService.getRolesByUserId(userId);
    return res.json(roles);
  }
}
