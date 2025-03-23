import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IUserRepository } from "../interfaces/IUserRepository";
import { GenericRepository } from "./GenericRepository";
import { User } from "@prisma/client";
import { UserEntity } from "../../models/user.entity";


@registry([
  {
    token: 'UserRepository',
    useClass: UserRepository,
  },
])
@injectable()
export class UserRepository extends GenericRepository<User> implements IUserRepository {
  constructor() {
    super(prisma, prisma.user, UserEntity, ['roles', 'agendamentos', 'auditorias', 'Anamneses']);
  }
}