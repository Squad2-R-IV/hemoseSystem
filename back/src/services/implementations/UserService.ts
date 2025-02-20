import { inject, injectable, registry } from "tsyringe";
import { IGenericService } from "../interfaces/IGenericService";
import { User } from "@prisma/client";
import { GenericService } from "./GenericService";

import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { UserRepository } from "../../repositories/implementations/UserRepository";

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

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByField("email", email); // Ensure repository is protected in GenericService
  }

}
