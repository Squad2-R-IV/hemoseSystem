import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IExameRepository } from "../interfaces/IExameRepository";
import { GenericRepository } from "./GenericRepository";
import { Exame } from "@prisma/client";

@registry([
  {
    token: 'ExameRepository',
    useClass: ExameRepository,
  },
])
@injectable()
export class ExameRepository extends GenericRepository<Exame> implements IExameRepository {
  constructor() {
    super(prisma, prisma.exame, ['Paciente']);
  }
}
