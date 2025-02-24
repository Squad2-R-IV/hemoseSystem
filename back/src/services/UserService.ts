import { inject, injectable, registry } from "tsyringe";
import { IGenericService } from "../interfaces/IGenericService";
import { User } from "@prisma/client";
import { GenericService } from "./GenericService";

import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepositroy";
import { UserRepository } from "../repositories/UserRepository";

@injectable()
@registry([
  {
      token: 'UserService',
      useClass: UserService
  },
])
export class UserService extends GenericService<User> implements IUserService {
  constructor(@inject("UserRepository") userRepository: UserRepository) {
    super(userRepository);
  }
}
