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
    refreshToken: string | null = null; // Use `string | null` em vez de `string | undefined`
}