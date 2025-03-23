import { injectable, registry } from "tsyringe";
import { RoleToPermission } from "@prisma/client";
import { GenericRepository } from "./GenericRepository";
import { IRoleToPermissionRepository } from "../interfaces/IRoleToPermissionRepository";
import prisma from "../../config/prisma";
import { RoleToPermissionEntity } from "../../models/roleToPermission.entity";



@injectable()
@registry([
    {
        token: 'RoleToPermissionRepository',
        useClass: RoleToPermissionRepository
    },
  ])
  
export class RoleToPermissionRepository  extends GenericRepository<RoleToPermission> implements IRoleToPermissionRepository {
  constructor() {
    super(prisma, prisma.roleToPermission, RoleToPermissionEntity, ['role', 'permission']);
  }
}
