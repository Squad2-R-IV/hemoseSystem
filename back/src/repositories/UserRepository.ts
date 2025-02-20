

import { injectable, registry } from "tsyringe";
import prisma from "../config/prisma";
import { IUserRepository } from "../interfaces/IUserRepositroy";
import { GenericRepository } from "./GenericRepository";
import { User } from "@prisma/client";

@registry([
  {
      token: 'UserRepository',
      useClass: UserRepository
  },
])
@injectable()
export class UserRepository extends GenericRepository<User> implements IUserRepository {
  constructor() {
    super(prisma, prisma.user);
  }
}
