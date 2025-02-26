import { AutoMap } from "@automapper/classes";

export class RoleToPermissionEntity {
    @AutoMap()
    roleId!: string;
    @AutoMap()
    permissionId!: string;
}
