import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IPrescricaoRepository } from "../interfaces/IPrescricaoRepository";
import { GenericRepository } from "./GenericRepository";
import { PrescricaoEntity } from "../../models/prescricao.entity";
import { Prescricao } from "@prisma/client";

@registry([
  {
    token: 'PrescricaoRepository',
    useClass: PrescricaoRepository,
  },
])
@injectable()
export class PrescricaoRepository extends GenericRepository<Prescricao> implements IPrescricaoRepository {
  constructor() {
    super(prisma, prisma.prescricao, PrescricaoEntity, ['Consulta']);
  }
}
