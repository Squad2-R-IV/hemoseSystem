import { inject, injectable, registry } from "tsyringe";
import { Role } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IRoleService } from "../interfaces/IRoleService";
import { RoleRepository } from "../../repositories/implementations/RoleRepository";
import { RoleWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'RoleService',
    useClass: RoleService,
  },
])
export class RoleService extends GenericService<RoleWithRelations> implements IRoleService {
  constructor(
    @inject("RoleRepository") roleRepository: RoleRepository,
  ) {
    super(roleRepository);
  }

  async getRolesByUserId(userId: string): Promise<RoleWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'users', value: { some: { userId: userId } } }], true);
  }
}
