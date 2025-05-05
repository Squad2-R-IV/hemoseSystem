import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IChamadosRepository } from "../interfaces/IChamadosRepository";
import { GenericRepository } from "./GenericRepository";
import { ChamadosEntity } from "../../models/chamados.entity";

@registry([
  {
    token: 'ChamadosRepository',
    useClass: ChamadosRepository,
  },
])
@injectable()
export class ChamadosRepository extends GenericRepository<any> implements IChamadosRepository {
  constructor() {
    super(prisma, prisma.chamados, ChamadosEntity, ['Usuario']);
  }
} 