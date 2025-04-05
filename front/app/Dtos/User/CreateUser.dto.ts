export class CreateUserDto{
    name!: string;
    password!: string;
    email!: string;
    cpf!: string;
    contato!: string;
    especialidade?: string;
    conselho?: string;
    registro?: string;
    roles?: string[];
}
