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
  async getAgendamentosNaEnfermaria(): Promise<Agendamento[]> {
    return await this.repository.findManyByQuery({
      where: {
        AND: [
          {
            // Filtrar agendamentos não cancelados
            status_agendamento: {
              not: 'Cancelado'
            }
          },
          {
            Consulta: {
              status: {
                in: ['ENFERMARIA', 'AGUARDANDO_ACOLHIMENTO']
              }
            }
          }
        ]
      },
      include: {
        Consulta: true,
        Paciente: true,
        Usuario: true
      }
    }, true) as AgendamentoWithRelations[]; // Cast the result to AgendamentoWithRelations[]
  }
  async getAgendamentosComConsultasAtivas(): Promise<AgendamentoWithRelations[]> {
    return await this.repository.findManyByQuery({
      where: {
        AND: [
          {
            // Filtrar agendamentos não cancelados
            status_agendamento: {
              not: 'Cancelado'
            }
          },
          {
            Consulta: {
              status: {
                in: ['AGUARDANDO', 'EM_ATENDIMENTO', 'CHAMADO', 'ENFERMARIA', 'AGUARDANDO_ACOLHIMENTO']
              }
            }
          }
        ]
      },
      include: {
        Consulta: true,
        Paciente: true,
        Usuario: true
      }
    }, true) as AgendamentoWithRelations[]; // Cast the result to AgendamentoWithRelations[]
  }

  async getAgendamentosByDate(date: Date): Promise<AgendamentoWithRelations[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const nextDay = new Date(startOfDay);
    nextDay.setDate(nextDay.getDate() + 1); // Dia seguinte, à meia-noite

    return await this.repository.findManyByQuery({
      where: {
        dt_agendamento: {
          gte: startOfDay,
          lt: nextDay,
        }
      },
      include: {
        Consulta: true,
        Paciente: true,
        Usuario: true
      }
    }, true) as AgendamentoWithRelations[];


  }

}
