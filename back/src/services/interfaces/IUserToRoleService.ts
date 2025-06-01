import { UserToRoleWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IUserToRoleService extends IGenericService<UserToRoleWithRelations> {
    getRolesByUserId(userId: string): Promise<UserToRoleWithRelations[]>;
    getUsersByRoleId(roleId: string): Promise<UserToRoleWithRelations[]>;
}
