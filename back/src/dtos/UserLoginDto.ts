// src/dtos/UserLoginDto.ts
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
  @IsEmail({}, { message: "O e-mail deve ser válido" })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  password: string;
}
