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
    especialidade: string | null = null;
    @AutoMap()
    conselho: string | null = null;
    @AutoMap()
    registro : string| null = null;
}

