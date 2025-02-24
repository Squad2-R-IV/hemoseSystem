import { RoleToPermission } from "@prisma/client";
import { IGenericRepository } from "./IGenericRepository";

export interface IRoleToPermissionRepository extends IGenericRepository<RoleToPermission> {}
