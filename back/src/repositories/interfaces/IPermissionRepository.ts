import { Permission } from "@prisma/client";
import { IGenericRepository } from "./IGenericRepository";

export interface IPermissionRepository extends IGenericRepository<Permission> {}
