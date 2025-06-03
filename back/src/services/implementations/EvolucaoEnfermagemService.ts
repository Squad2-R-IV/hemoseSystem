import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IEvolucaoEnfermagemService } from "../interfaces/IEvolucaoEnfermagemService";
import { EvolucaoEnfermagemRepository } from "../../repositories/implementations/EvolucaoEnfermagemRepository";
import { EvolucaoEnfermagemWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'EvolucaoEnfermagemService',
    useClass: EvolucaoEnfermagemService,
  },
])
export class EvolucaoEnfermagemService extends GenericService<EvolucaoEnfermagemWithRelations> implements IEvolucaoEnfermagemService {
  constructor(
    @inject("EvolucaoEnfermagemRepository") evolucaoEnfermagemRepository: EvolucaoEnfermagemRepository,
  ) {
    super(evolucaoEnfermagemRepository);
  }
  
  async getEvolucoesEnfermagemByConsultaId(consultaId: number): Promise<EvolucaoEnfermagemWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'id_consulta', value: consultaId }], true);
  }
}
