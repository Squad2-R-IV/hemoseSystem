import { injectable, inject, registry } from "tsyringe";
import { PrismaClient, UserToRole } from "@prisma/client";
import { GenericRepository } from "./GenericRepository";
import { IUserToRoleRepository } from "../interfaces/IUserToRoleRepository";
import prisma from "../../config/prisma";
import { UserToRoleEntity } from "../../models/userToRole.entity";



@injectable()
@registry([
  {
      token: 'UserToRoleRepository',
      useClass: UserToRoleRepository
  },
])
export class UserToRoleRepository extends GenericRepository<UserToRole> implements IUserToRoleRepository {
  constructor() {
    super(prisma, prisma.userToRole, UserToRoleEntity, ['user', 'role']);
  }
}
