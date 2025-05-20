
import { CondutaWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface ICondutaService extends IGenericService<CondutaWithRelations> {
    getCondutasByConsultaId(consultaId: number): Promise<CondutaWithRelations[]>;

}
