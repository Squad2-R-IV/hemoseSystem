import { injectable, inject, registry } from "tsyringe";
import { PrismaClient, Role, RoleToPermission } from "@prisma/client";
import { GenericRepository } from "./GenericRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import prisma from "../../config/prisma";
import { RoleEntity } from "../../models/role.entity";





@injectable()
@registry([
  {
      token: 'RoleRepository',
      useClass: RoleRepository
  },
])
export class RoleRepository  extends GenericRepository<Role> implements IRoleRepository {
  constructor() {
    super(prisma, prisma.role, RoleEntity, ['users', 'permissions']);
  }


}
