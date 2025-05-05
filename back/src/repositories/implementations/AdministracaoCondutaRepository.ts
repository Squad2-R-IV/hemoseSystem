import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IAdministracaoCondutaRepository } from "../interfaces/IAdministracaoCondutaRepository";
import { GenericRepository } from "./GenericRepository";
import { AdministracaoCondutaEntity } from "../../models/administracaoConduta.entity";

@registry([
  {
    token: 'AdministracaoCondutaRepository',
    useClass: AdministracaoCondutaRepository,
  },
])
@injectable()
export class AdministracaoCondutaRepository extends GenericRepository<any> implements IAdministracaoCondutaRepository {
  constructor() {
    super(prisma, prisma.administracaoConduta, AdministracaoCondutaEntity, ['Conduta', 'Funcionario']);
  }
} 