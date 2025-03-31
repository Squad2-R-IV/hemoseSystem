import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IConsultaRepository } from "../interfaces/IConsultaRepository";
import { GenericRepository } from "./GenericRepository";
import { ConsultaEntity } from "../../models/consulta.entity";
import { Consulta } from "@prisma/client";



@registry([
  {
    token: 'ConsultaRepository',
    useClass: ConsultaRepository,
  },
])
@injectable()
export class ConsultaRepository extends GenericRepository<Consulta> implements IConsultaRepository {
  constructor() {
    super(prisma, prisma.consulta, ConsultaEntity, ['Agendamento', 'Anamnese']);
  }
}