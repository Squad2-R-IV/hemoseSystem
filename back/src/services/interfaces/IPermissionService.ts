import { PermissionWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IPermissionService extends IGenericService<PermissionWithRelations> {
    getPermissionsByRoleId(roleId: string): Promise<PermissionWithRelations[]>;
}
