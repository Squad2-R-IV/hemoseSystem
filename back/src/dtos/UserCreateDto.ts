// src/dtos/UserCreateDto.ts
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserCreateDto {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  @Length(3, 50, { message: "O nome deve ter entre 3 e 50 caracteres" })
  name: string;

  @IsEmail({}, { message: "O e-mail deve ser válido" })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  @Length(6, 100, { message: "A senha deve ter pelo menos 6 caracteres" })
  password: string;
}
