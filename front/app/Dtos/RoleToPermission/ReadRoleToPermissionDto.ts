import type { ReadRoleDto } from "~/Dtos/Role/ReadRoleDto";
import type { ReadPermissionDto } from "~/Dtos/Permission/ReadPermissionDto";

export class ReadRoleToPermissionDto {
  roleId!: string;
  permissionId!: string;
  role?: ReadRoleDto;
  permission?: ReadPermissionDto;
}
