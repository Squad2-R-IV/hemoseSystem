import { inject, injectable, registry } from "tsyringe";
import { Agendamento } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IAgendamentoService } from "../interfaces/IAgendamentoService";
import { AgendamentoRepository } from "../../repositories/implementations/AgendamentoRepository";
import { AgendamentoWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
      token: 'AgendamentoService',
      useClass: AgendamentoService
  },
])
export class AgendamentoService extends GenericService<AgendamentoWithRelations> implements IAgendamentoService {
  constructor(
    @inject("AgendamentoRepository") agendamentoRepository: AgendamentoRepository,
  ) {
    super(agendamentoRepository);
  }
}