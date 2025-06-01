import { inject, injectable, registry } from "tsyringe";
import { UserToRole } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IUserToRoleService } from "../interfaces/IUserToRoleService";
import { UserToRoleRepository } from "../../repositories/implementations/UserToRoleRepository";
import { UserToRoleWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'UserToRoleService',
    useClass: UserToRoleService,
  },
])
export class UserToRoleService extends GenericService<UserToRoleWithRelations> implements IUserToRoleService {
  constructor(
    @inject("UserToRoleRepository") userToRoleRepository: UserToRoleRepository,
  ) {
    super(userToRoleRepository);
  }

  async getRolesByUserId(userId: string): Promise<UserToRoleWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'userId', value: userId }], true);
  }

  async getUsersByRoleId(roleId: string): Promise<UserToRoleWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'roleId', value: roleId }], true);
  }
}
