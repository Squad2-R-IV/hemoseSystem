import { IGenericRepository } from "./IGenericRepository";
import { Consulta } from "@prisma/client";

export interface IConsultaRepository extends IGenericRepository<Consulta> {

}
