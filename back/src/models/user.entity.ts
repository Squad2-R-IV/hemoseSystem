import { AutoMap } from "@automapper/classes";

export class UserEntity {
    @AutoMap()
    id!: string;
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
    status: string = 'A';
    @AutoMap()
    especialidade: string | null = null;
    @AutoMap()
    conselho: string | null = null; 
    @AutoMap()
    registro : string| null = null;
    refreshToken: string | null = null; // Use `string | null` em vez de `string | undefined`


}
