import { Role } from "@prisma/client";
import { IGenericRepository } from "./IGenericRepository";

export interface IRoleRepository extends IGenericRepository<Role> {}
