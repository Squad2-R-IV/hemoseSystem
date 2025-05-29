import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IAdministracaoCondutaRepository } from "../interfaces/IAdministracaoCondutaRepository";
import { GenericRepository } from "./GenericRepository";
import { AdministracaoConduta } from "@prisma/client";

@registry([
  {
    token: 'AdministracaoCondutaRepository',
    useClass: AdministracaoCondutaRepository,
  },
])
@injectable()
export class AdministracaoCondutaRepository extends GenericRepository<AdministracaoConduta> implements IAdministracaoCondutaRepository {
  constructor() {
    super(prisma, prisma.administracaoConduta, ['Conduta', 'Funcionario']);
  }
}
