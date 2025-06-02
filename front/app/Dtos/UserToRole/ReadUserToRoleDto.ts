import type { ReadUserDto } from "~/Dtos/User/ReadUser.dto";
import type { ReadRoleDto } from "~/Dtos/Role/ReadRoleDto";

export class ReadUserToRoleDto {
  userId!: string;
  roleId!: string;
  user?: ReadUserDto;
  role?: ReadRoleDto;
}
