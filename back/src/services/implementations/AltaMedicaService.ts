import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IAltaMedicaService } from "../interfaces/IAltaMedicaService";
import { AltaMedicaRepository } from "../../repositories/implementations/AltaMedicaRepository";
import { AltaMedicaWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'AltaMedicaService',
    useClass: AltaMedicaService,
  },
])
export class AltaMedicaService extends GenericService<AltaMedicaWithRelations> implements IAltaMedicaService {
  constructor(
    @inject("AltaMedicaRepository") altaMedicaRepository: AltaMedicaRepository,
  ) {
    super(altaMedicaRepository);
  }
  
  async getAltaMedicaByConsultaId(consultaId: number): Promise<AltaMedicaWithRelations | null> {
    return await this.repository.findByFields([{ field: 'id_consulta', value: consultaId }], true);
  }
  
}
