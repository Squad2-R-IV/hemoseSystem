import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IHistoricoRepository } from "../interfaces/IHistoricoRepository";
import { GenericRepository } from "./GenericRepository";
import { HistoricoEntity } from "../../models/historico.entity";
import { Historico } from "@prisma/client";



@registry([
  {
    token: 'HistoricoRepository',
    useClass: HistoricoRepository,
  },
])
@injectable()
export class HistoricoRepository extends GenericRepository<Historico> implements IHistoricoRepository {
  constructor() {
    super(prisma, prisma.historico, HistoricoEntity, ['Agendamento', 'Anamneses']);
  }
}