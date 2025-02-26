import { AutoMap } from "@automapper/classes";

export class CreateUserDto{
    @AutoMap()
    name!: string;
    @AutoMap()
    password!: string;
    @AutoMap()
    email!: string;
}