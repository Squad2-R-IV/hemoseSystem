import { IGenericRepository } from "./IGenericRepository";
import { User } from "@prisma/client";

export interface IUserRepository extends IGenericRepository<User> {

}
