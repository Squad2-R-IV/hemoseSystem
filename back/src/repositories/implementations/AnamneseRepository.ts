import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IAnamneseRepository } from "../interfaces/IAnamneseRepository";
import { GenericRepository } from "./GenericRepository";
import { Anamnese } from "@prisma/client";

@registry([
  {
    token: 'AnamneseRepository',
    useClass: AnamneseRepository,
  },
])
@injectable()
export class AnamneseRepository extends GenericRepository<Anamnese> implements IAnamneseRepository {
  constructor() {
    super(prisma, prisma.anamnese, ['Consulta', 'User']);
  }
}
