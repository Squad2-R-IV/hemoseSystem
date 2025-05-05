import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IExamesRepository } from "../interfaces/IExamesRepository";
import { GenericRepository } from "./GenericRepository";
import { ExamesEntity } from "../../models/exames.entity";

@registry([
  {
    token: 'ExamesRepository',
    useClass: ExamesRepository,
  },
])
@injectable()
export class ExamesRepository extends GenericRepository<any> implements IExamesRepository {
  constructor() {
    super(prisma, prisma.exames, ExamesEntity, ['Consulta', 'Funcionario']);
  }
} 