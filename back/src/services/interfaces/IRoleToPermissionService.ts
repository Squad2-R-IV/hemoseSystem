import { RoleToPermissionWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IRoleToPermissionService extends IGenericService<RoleToPermissionWithRelations> {
    getPermissionsByRoleId(roleId: string): Promise<RoleToPermissionWithRelations[]>;
    getRolesByPermissionId(permissionId: string): Promise<RoleToPermissionWithRelations[]>;
}
