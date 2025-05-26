
import { Consulta } from "@prisma/client";
import { IGenericService } from "./IGenericService";
import { ConsultaWithRelations } from "../../utils/includeTypes";

export interface IConsultaService extends IGenericService<Consulta> {

    getConsultasByPacientId(pacienteId: number): Promise<ConsultaWithRelations[]> ;
}


