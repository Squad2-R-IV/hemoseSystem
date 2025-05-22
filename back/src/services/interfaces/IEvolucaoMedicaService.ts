import { EvolucaoMedicaWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IEvolucaoMedicaService extends IGenericService<EvolucaoMedicaWithRelations> {
    getEvolucoesMedicasByConsultaId(consultaId: number): Promise<EvolucaoMedicaWithRelations[]>;
}
