import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IEvolucaoMedicaRepository } from "../interfaces/IEvolucaoMedicaRepository";
import { GenericRepository } from "./GenericRepository";
import { EvolucaoMedica } from "@prisma/client";

@registry([
  {
    token: 'EvolucaoMedicaRepository',
    useClass: EvolucaoMedicaRepository,
  },
])
@injectable()
export class EvolucaoMedicaRepository extends GenericRepository<EvolucaoMedica> implements IEvolucaoMedicaRepository {
  constructor() {
    super(prisma, prisma.evolucaoMedica, ['Usuario', 'Consulta']);
  }
}
