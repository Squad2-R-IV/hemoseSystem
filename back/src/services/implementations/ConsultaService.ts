import { inject, injectable, registry } from "tsyringe";
import {Consulta} from "@prisma/client";
import { GenericService } from "./GenericService";
import { IConsultaService } from "../interfaces/IConsultaService";
import { ConsultaRepository } from "../../repositories/implementations/ConsultaRepository";
import { ConsultaWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
      token: 'ConsultaService',
      useClass: ConsultaService
  },
])
export class ConsultaService extends GenericService<ConsultaWithRelations> implements IConsultaService {
  constructor(
    @inject("ConsultaRepository") consultaRepository: ConsultaRepository,
  ) {
    super(consultaRepository);
  }

  async getConsultasByPacientId(pacienteId: number): Promise<ConsultaWithRelations[]> {
    return await this.repository.findManyByQuery({
      where: {
        Agendamento: {
          id_paciente: pacienteId
        }
      },
      include: {
        Anamnese: true,
        Agendamento: {
          include: {
            Paciente: true,
            Usuario: true
          }
        },
        Condutas: true,
        Evolucoes: true,
      }
    }, true) as ConsultaWithRelations[];
  }
}