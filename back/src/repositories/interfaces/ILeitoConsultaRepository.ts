import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { ILeitoConsultaRepository } from "../interfaces/ILeitoConsultaRepository";
import { GenericRepository } from "./GenericRepository";
import { LeitoConsultaEntity } from "../../models/leitoConsulta.entity";

@registry([
  {
    token: 'LeitoConsultaRepository',
    useClass: LeitoConsultaRepository,
  },
])
@injectable()
export class LeitoConsultaRepository extends GenericRepository<any> implements ILeitoConsultaRepository {
  constructor() {
    super(prisma, prisma.leitoConsulta, LeitoConsultaEntity, ['Consulta', 'Leito']);
  }
}