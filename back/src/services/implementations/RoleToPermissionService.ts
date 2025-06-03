import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IRoleToPermissionService } from "../interfaces/IRoleToPermissionService";
import { RoleToPermissionRepository } from "../../repositories/implementations/RoleToPermissionRepository";
import { RoleToPermissionWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'RoleToPermissionService',
    useClass: RoleToPermissionService,
  },
])
export class RoleToPermissionService extends GenericService<RoleToPermissionWithRelations> implements IRoleToPermissionService {
  constructor(
    @inject("RoleToPermissionRepository") roleToPermissionRepository: RoleToPermissionRepository,
  ) {
    super(roleToPermissionRepository);
  }

  async getPermissionsByRoleId(roleId: string): Promise<RoleToPermissionWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'roleId', value: roleId }], true);
  }

  async getRolesByPermissionId(permissionId: string): Promise<RoleToPermissionWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'permissionId', value: permissionId }], true);
  }
}
