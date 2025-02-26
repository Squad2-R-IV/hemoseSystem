import { AutoMap } from "@automapper/classes";


export class PermissionEntity {
    @AutoMap()
    id!: string;
    @AutoMap()
    name!: string;
    @AutoMap()
    description!: string;
}
