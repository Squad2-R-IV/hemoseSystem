import { AutoMap } from "@automapper/classes";

export class ReadUserDto{
    @AutoMap()
    id!: string;
    @AutoMap()
    name!: string;
    @AutoMap()
    email!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    contato!: string;
    @AutoMap()
    status!: string;
    @AutoMap()
    especialidade?: string;
    @AutoMap()
    conselho?: string;
    @AutoMap()
    registro?: string;
}

