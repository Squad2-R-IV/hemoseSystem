import { EvolucaoEnfermagemWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IEvolucaoEnfermagemService extends IGenericService<EvolucaoEnfermagemWithRelations> {
    getEvolucoesEnfermagemByConsultaId(consultaId: number): Promise<EvolucaoEnfermagemWithRelations[]>;
}
