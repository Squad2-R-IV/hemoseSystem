import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IAgendamentoRepository } from "../interfaces/IAgendamentoRepository";
import { GenericRepository } from "./GenericRepository";
import { AgendamentoEntity } from "../../models/agendamento.entity";
import { Agendamento } from "@prisma/client";

@registry([
  {
    token: "AgendamentoRepository",
    useClass: AgendamentoRepository,
  },
])
@injectable()
export class AgendamentoRepository
  extends GenericRepository<Agendamento>
  implements IAgendamentoRepository
{
  constructor() {
    super(prisma, prisma.agendamento, AgendamentoEntity, ["Paciente", "Usuario", "historico"]);
  }
}