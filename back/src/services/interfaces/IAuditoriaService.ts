
import { Auditoria } from "@prisma/client";
import { IGenericService } from "./IGenericService";

export interface IAuditoriaService extends IGenericService<Partial<Auditoria>> {

}