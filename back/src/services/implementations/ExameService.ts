import { inject, injectable, registry } from "tsyringe";
import { Exame } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IExameService } from "../interfaces/IExameService";
import { ExameRepository } from "../../repositories/implementations/ExameRepository";
import { ExameWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
      token: 'ExameService',
      useClass: ExameService
  },
])
export class ExameService extends GenericService<ExameWithRelations> implements IExameService {
  constructor(
    @inject("ExameRepository") exameRepository: ExameRepository,
  ) {
    super(exameRepository);
  }

  async findExamesByPacienteId(pacienteId: number): Promise<ExameWithRelations[]> {
    return this.repository.findManyByFields([{ field: "id_paciente", value: pacienteId }], false);
  }

  async findExamesByStatus(status: string): Promise<ExameWithRelations[]> {
    return this.repository.findManyByFields([{ field: "status", value: status }], false);
  }
}
