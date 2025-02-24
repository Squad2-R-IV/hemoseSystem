import { UserToRole } from "@prisma/client";
import { IGenericRepository } from "./IGenericRepository";

export interface IUserToRoleRepository extends IGenericRepository<UserToRole> {}
