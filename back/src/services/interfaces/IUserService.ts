import { IGenericService } from "./IGenericService";
import { Role, User, UserToRole } from "@prisma/client";

export interface IUserService extends IGenericService<User> {

    findByRefreshToken(refreshToken: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    getUserRoles(userId: string): Promise<Role[]>;
    updateUserRoles(userId: string, roles: string[]): Promise<void>;
}


