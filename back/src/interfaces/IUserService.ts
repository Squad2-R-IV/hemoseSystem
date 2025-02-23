import { IGenericService } from "./IGenericService";
import { User } from "@prisma/client";

export interface IUserService extends IGenericService<User> {}
