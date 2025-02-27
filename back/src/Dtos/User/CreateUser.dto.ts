import { AutoMap } from "@automapper/classes";

export class CreateUserDto{
    @AutoMap()
    name!: string;
    @AutoMap()
    password!: string;
    @AutoMap()
    email!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    contato!: string;
    @AutoMap()
    especialidade?: string;
    @AutoMap()
    conselho?: string;
    @AutoMap()
    registro?: string;
}
