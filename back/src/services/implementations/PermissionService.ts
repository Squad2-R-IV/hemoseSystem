import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IPermissionService } from "../interfaces/IPermissionService";
import { PermissionRepository } from "../../repositories/implementations/PermissionRepository";
import { PermissionWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'PermissionService',
    useClass: PermissionService,
  },
])
export class PermissionService extends GenericService<PermissionWithRelations> implements IPermissionService {
  constructor(
    @inject("PermissionRepository") permissionRepository: PermissionRepository,
  ) {
    super(permissionRepository);
  }

  async getPermissionsByRoleId(roleId: string): Promise<PermissionWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'roles', value: { some: { roleId: roleId } } }], true);
  }
}
