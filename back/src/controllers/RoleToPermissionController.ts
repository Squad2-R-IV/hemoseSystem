import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateRoleToPermissionDto } from "../Dtos/RoleToPermission/CreateRoleToPermissionDto";
import { UpdateRoleToPermissionDto } from "../Dtos/RoleToPermission/UpdateRoleToPermissionDto";
import { ReadRoleToPermissionDto } from "../Dtos/RoleToPermission/ReadRoleToPermissionDto";
import { IRoleToPermissionService } from "../services/interfaces/IRoleToPermissionService";
import { RoleToPermissionService } from "../services/implementations/RoleToPermissionService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { RoleToPermission } from "@prisma/client";

@injectable()
export class RoleToPermissionController extends GenericController<
  RoleToPermission,
  CreateRoleToPermissionDto,
  UpdateRoleToPermissionDto,
  ReadRoleToPermissionDto
> {
  constructor(
    @inject(RoleToPermissionService) private readonly roleToPermissionService: IRoleToPermissionService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      roleToPermissionService,
      CreateRoleToPermissionDto,
      UpdateRoleToPermissionDto,
      ReadRoleToPermissionDto,
      auditoriaService,
      "RoleToPermission"
    );
  }

  async getPermissionsByRoleId(req: Request, res: Response): Promise<Response> {
    const roleId = req.query.roleId as string;
    if (!roleId) {
      return res.status(400).json({ message: "roleId é obrigatório" });
    }
    const permissions = await this.roleToPermissionService.getPermissionsByRoleId(roleId);
    return res.json(permissions);
  }

  async getRolesByPermissionId(req: Request, res: Response): Promise<Response> {
    const permissionId = req.query.permissionId as string;
    if (!permissionId) {
      return res.status(400).json({ message: "permissionId é obrigatório" });
    }
    const roles = await this.roleToPermissionService.getRolesByPermissionId(permissionId);
    return res.json(roles);
  }
}
