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

  async getAgendamentosComConsultasAtivas(): Promise<AgendamentoWithRelations[]> {
    return await this.repository.findManyByQuery({
      where: {
        Consulta: {
          status: {
            in: ['AGUARDANDO', 'EM_ATENDIMENTO', 'CHAMADO']
          }
        }
      },
      include: {
        Consulta: true,
        Paciente: true,
        Usuario: true
      }
    }, true) as AgendamentoWithRelations[]; // Cast the result to AgendamentoWithRelations[]
  }
}
