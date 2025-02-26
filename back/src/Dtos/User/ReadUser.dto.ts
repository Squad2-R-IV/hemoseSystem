import { AutoMap } from "@automapper/classes";

export class ReadUserDto{
    @AutoMap()
    id!: string;
    @AutoMap()
    name!: string;
    @AutoMap()
    password!: string;
    @AutoMap()
    email!: string;
}