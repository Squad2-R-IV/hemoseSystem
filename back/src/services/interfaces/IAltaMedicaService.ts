import { AltaMedicaWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IAltaMedicaService extends IGenericService<AltaMedicaWithRelations> {
    getAltaMedicaByConsultaId(consultaId: number): Promise<AltaMedicaWithRelations | null>;
}
