import { injectable, inject, registry } from "tsyringe";
import { PrismaClient, RoleToPermission } from "@prisma/client";
import { GenericRepository } from "./GenericRepository";
import { IRoleToPermissionRepository } from "../interfaces/IRoleToPermissionRepository";
import prisma from "../../config/prisma";



@injectable()
@registry([
    {
        token: 'RoleToPermissionRepository',
        useClass: RoleToPermissionRepository
    },
  ])
  
export class RoleToPermissionRepository  extends GenericRepository<RoleToPermission> implements IRoleToPermissionRepository {
  constructor() {
    super(prisma, prisma.roleToPermission);
  }
}
