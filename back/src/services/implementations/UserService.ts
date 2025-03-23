import { container, inject, injectable, registry } from "tsyringe";
import { IGenericService } from "../interfaces/IGenericService";
import { Role, User, UserToRole } from "@prisma/client";
import { GenericService } from "./GenericService";
import prisma from "../../config/prisma"; // Importa a instância do Prisma configurada

import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { IUserToRoleRepository } from "../../repositories/interfaces/IUserToRoleRepository";
import { IRoleRepository } from "../../repositories/interfaces/IRoleRepository";
import { UserToRoleRepository } from "../../repositories/implementations/UserToRoleRepository";
import { RoleRepository } from "../../repositories/implementations/RoleRepository";
import { UserWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
      token: 'UserService',
      useClass: UserService
  },
])
export class UserService extends GenericService<UserWithRelations> implements IUserService {
  constructor(
    @inject("UserRepository") userRepository: UserRepository,
  ) {
    super(userRepository);
  }
  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    const user = await this.repository.findByFields([{ field: 'refreshToken', value: refreshToken }]);
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findByFields([{ field: 'email', value: email }]);
    return user;
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const userToRoleRepository = container.resolve(UserToRoleRepository);
    const roleRepository = container.resolve(RoleRepository);
    const userToRoles = await userToRoleRepository.findManyByFields([{ field: 'userId', value: userId }]);
    let userRoles : Role[] = [];
    for (const userToRole of userToRoles) {
      const role = await roleRepository.findById(userToRole.roleId);
      if (role) {
        userRoles.push(role);
      }
    }
    return userRoles;
  }

  async updateUserRoles(userId: string, roles: string[]): Promise<void> {
    const roleRepository = container.resolve(RoleRepository);

    // Verificar se todas as roles existem
    const reqRoles = roles.map(async role => {
      const roleRecord = await roleRepository.findByField("name", role);
      if (!roleRecord) {
        throw new Error(`Role ${role} não encontrada`);
      }
      return roleRecord;
    });
    const rolesRecords = await Promise.all(reqRoles);

    // Deletar as roles atuais do usuário
    await prisma.userToRole.deleteMany({
        where: { userId }
    });

    // Inserir as novas roles
    const userToRoleData = rolesRecords.map(role => ({
        userId,
        roleId: role.id
    }));

    await prisma.userToRole.createMany({ 
        data: userToRoleData
    });
  }
}