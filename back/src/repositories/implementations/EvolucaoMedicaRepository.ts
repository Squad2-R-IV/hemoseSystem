import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IEvolucaoMedicaRepository } from "../interfaces/IEvolucaoMedicaRepository";
import { GenericRepository } from "./GenericRepository";
import { EvolucaoMedicaEntity } from "../../models/evolucaoMedica.entity";

@registry([
  {
    token: 'EvolucaoMedicaRepository',
    useClass: EvolucaoMedicaRepository,
  },
])
@injectable()
export class EvolucaoMedicaRepository extends GenericRepository<any> implements IEvolucaoMedicaRepository {
  constructor() {
    super(prisma, prisma.evolucaoMedica, EvolucaoMedicaEntity, ['Consulta', 'Funcionario', 'ExameFisico']);
  }
} 