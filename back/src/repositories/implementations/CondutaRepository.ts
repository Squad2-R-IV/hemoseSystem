import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { ICondutaRepository } from "../interfaces/ICondutaRepository";
import { GenericRepository } from "./GenericRepository";
import { Conduta } from "@prisma/client";

@registry([
  {
    token: 'CondutaRepository',
    useClass: CondutaRepository,
  },
])
@injectable()
export class CondutaRepository extends GenericRepository<Conduta> implements ICondutaRepository {
  constructor() {
    super(prisma, prisma.conduta, ['User', 'Consulta', 'AdministracaoCondutas']);
  }
}
