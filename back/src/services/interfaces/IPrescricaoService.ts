import { PrescricaoEntity } from "../../models/prescricao.entity";
import { PrescricaoWithRelations } from "../../utils/includeTypes";
import { IGenericService } from "./IGenericService";

export interface IPrescricaoService extends IGenericService<PrescricaoWithRelations> {

}
