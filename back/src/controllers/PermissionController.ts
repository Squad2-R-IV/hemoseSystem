import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreatePermissionDto } from "../Dtos/Permission/CreatePermissionDto";
import { UpdatePermissionDto } from "../Dtos/Permission/UpdatePermissionDto";
import { ReadPermissionDto } from "../Dtos/Permission/ReadPermissionDto";
import { IPermissionService } from "../services/interfaces/IPermissionService";
import { PermissionService } from "../services/implementations/PermissionService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { Permission } from "@prisma/client";

@injectable()
export class PermissionController extends GenericController<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  ReadPermissionDto
> {
  constructor(
    @inject(PermissionService) private readonly permissionService: IPermissionService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      permissionService,
      CreatePermissionDto,
      UpdatePermissionDto,
      ReadPermissionDto,
      auditoriaService,
      "Permission"
    );
  }

  async getPermissionsByRoleId(req: Request, res: Response): Promise<Response> {
    const roleId = req.query.roleId as string;
    if (!roleId) {
      return res.status(400).json({ message: "roleId é obrigatório" });
    }
    const permissions = await this.permissionService.getPermissionsByRoleId(roleId);
    return res.json(permissions);
  }
}
