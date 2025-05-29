import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IEvolucaoEnfermagemRepository } from "../interfaces/IEvolucaoEnfermagemRepository";
import { GenericRepository } from "./GenericRepository";
import { EvolucaoEnfermagem } from "@prisma/client";

@registry([
  {
    token: 'EvolucaoEnfermagemRepository',
    useClass: EvolucaoEnfermagemRepository,
  },
])
@injectable()
export class EvolucaoEnfermagemRepository extends GenericRepository<EvolucaoEnfermagem> implements IEvolucaoEnfermagemRepository {
  constructor() {
    super(prisma, prisma.evolucaoEnfermagem, ['Funcionario', 'Consulta']);
  }
}
