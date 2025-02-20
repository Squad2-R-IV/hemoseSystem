// src/dtos/UserUpdateDto.ts
import { IsEmail, IsOptional, Length } from "class-validator";

export class UserUpdateDto {
  @IsOptional()
  @Length(3, 50, { message: "O nome deve ter entre 3 e 50 caracteres" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "O e-mail deve ser válido" })
  email?: string;
}
