import { injectable, inject, registry } from "tsyringe";
import { PrismaClient, Permission } from "@prisma/client";
import { GenericRepository } from "./GenericRepository";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import prisma from "../../config/prisma";

@injectable()
@registry([
  {
      token: 'PermissionRepository',
      useClass: PermissionRepository
  },
])
export class PermissionRepository extends GenericRepository<Permission> implements IPermissionRepository {
  constructor() {
    super(prisma, prisma.permission, ['roles']);
  }
}