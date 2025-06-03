import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IPacienteService } from "../interfaces/IPacienteService";
import { PacienteRepository } from "../../repositories/implementations/PacienteRepository";
import { PacienteWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
      token: 'PacienteService',
      useClass: PacienteService
  },
])
export class PacienteService extends GenericService<PacienteWithRelations> implements IPacienteService {
  constructor(
    @inject("PacienteRepository") pacienteRepository: PacienteRepository,
  ) {
    super(pacienteRepository);
  }

  async findPacienteByCpf(cpf: string): Promise<PacienteWithRelations | null> {
    return this.repository.findByFields([{ field: "cpf", value: cpf }]);
  }
}