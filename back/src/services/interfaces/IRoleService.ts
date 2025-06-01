import { RoleWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IRoleService extends IGenericService<RoleWithRelations> {
    getRolesByUserId(userId: string): Promise<RoleWithRelations[]>;
}
