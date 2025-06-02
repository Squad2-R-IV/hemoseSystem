import { injectable, inject, registry } from "tsyringe";
import { PrismaClient, Role, RoleToPermission } from "@prisma/client";
import { GenericRepository } from "./GenericRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import prisma from "../../config/prisma";





@injectable()
@registry([
  {
      token: 'RoleRepository',
      useClass: RoleRepository
  },
])
export class RoleRepository extends GenericRepository<Role> implements IRoleRepository {
  constructor() {
    super(prisma, prisma.role, ['users', 'permissions']);
  }

  async findById(id: string, includeRelations: boolean = false): Promise<Role | null> {
    if (includeRelations) {
      return await prisma.role.findUnique({
        where: { id },
        include: {
          users: {
            include: {
              user: true
            }
          },
          permissions: {
            include: {
              permission: true
            }
          }
        }
      });
    }
    
    return await prisma.role.findUnique({
      where: { id }
    });
  }

  async findAll(includeRelations: boolean = false): Promise<Role[]> {
    if (includeRelations) {
      return await prisma.role.findMany({
        include: {
          users: {
            include: {
              user: true
            }
          },
          permissions: {
            include: {
              permission: true
            }
          }
        }
      });
    }
    
    return await prisma.role.findMany();
  }
}
