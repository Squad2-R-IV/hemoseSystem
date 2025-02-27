import { AutoMap } from "@automapper/classes";

export class UpdateUserDto{
    @AutoMap()
    name?: string;
    @AutoMap()
    password?: string;
    @AutoMap()
    email?: string;
    @AutoMap()
    cpf?: string;
    @AutoMap()
    contato?: string;
    @AutoMap()
    especialidade: string | null = null;
    @AutoMap()
    conselho: string | null = null;
    @AutoMap()
    registro : string| null = null;
}
