import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { ILeitoRepository } from "../interfaces/ILeitoRepository";
import { GenericRepository } from "./GenericRepository";
import { LeitoEntity } from "../../models/leito.entity";

@registry([
  {
    token: 'LeitoRepository',
    useClass: LeitoRepository,
  },
])
@injectable()
export class LeitoRepository extends GenericRepository<any> implements ILeitoRepository {
  constructor() {
    super(prisma, prisma.leito, LeitoEntity, ['LeitoConsultas']);
  }
} 