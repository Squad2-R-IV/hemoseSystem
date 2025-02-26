import { AutoMap } from "@automapper/classes";

export class UpdateUserDto{
    @AutoMap()
    name!: string;
    @AutoMap()
    password!: string;
    @AutoMap()
    email!: string;
}