import { AdministracaoCondutaWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IAdministracaoCondutaService extends IGenericService<AdministracaoCondutaWithRelations> {
    getAdministracaoCondutaByCondutaId(condutaId: number): Promise<AdministracaoCondutaWithRelations[]>;
}
