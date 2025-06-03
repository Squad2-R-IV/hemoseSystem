import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { IAdministracaoCondutaService } from "../interfaces/IAdministracaoCondutaService";
import { AdministracaoCondutaRepository } from "../../repositories/implementations/AdministracaoCondutaRepository";
import { AdministracaoCondutaWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'AdministracaoCondutaService',
    useClass: AdministracaoCondutaService,
  },
])
export class AdministracaoCondutaService extends GenericService<AdministracaoCondutaWithRelations> implements IAdministracaoCondutaService {
  constructor(
    @inject("AdministracaoCondutaRepository") administracaoCondutaRepository: AdministracaoCondutaRepository,
  ) {
    super(administracaoCondutaRepository);
  }
  
  async getAdministracaoCondutaByCondutaId(condutaId: number): Promise<AdministracaoCondutaWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'id_conduta', value: condutaId }], true);
  }
  
}
