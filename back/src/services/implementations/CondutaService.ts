import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { ICondutaService } from "../interfaces/ICondutaService";
import { CondutaRepository } from "../../repositories/implementations/CondutaRepository";
import { CondutaWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'CondutaService',
    useClass: CondutaService,
  },
])
export class CondutaService extends GenericService<CondutaWithRelations> implements ICondutaService {
  constructor(
    @inject("CondutaRepository") condutaRepository: CondutaRepository,
  ) {
    super(condutaRepository);
  }
  async getCondutasByConsultaId(consultaId: number): Promise<CondutaWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'id_consulta', value: consultaId }], true);
  }

}
