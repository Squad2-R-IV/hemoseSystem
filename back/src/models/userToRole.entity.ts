import { AutoMap } from "@automapper/classes";

export class UserToRoleEntity {
    @AutoMap()
    userId!: string;
    @AutoMap()
    roleId!: string;
}
