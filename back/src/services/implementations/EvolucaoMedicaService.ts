import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IEvolucaoMedicaService } from "../interfaces/IEvolucaoMedicaService";
import { EvolucaoMedicaRepository } from "../../repositories/implementations/EvolucaoMedicaRepository";
import { EvolucaoMedicaWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'EvolucaoMedicaService',
    useClass: EvolucaoMedicaService,
  },
])
export class EvolucaoMedicaService extends GenericService<EvolucaoMedicaWithRelations> implements IEvolucaoMedicaService {
  constructor(
    @inject("EvolucaoMedicaRepository") evolucaoMedicaRepository: EvolucaoMedicaRepository,
  ) {
    super(evolucaoMedicaRepository);
  }
  
  async getEvolucoesMedicasByConsultaId(consultaId: number): Promise<EvolucaoMedicaWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'id_consulta', value: consultaId }], true);
  }
}
