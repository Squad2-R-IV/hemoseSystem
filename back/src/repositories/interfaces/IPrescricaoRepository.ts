import { IGenericRepository } from "./IGenericRepository";
import { Prescricao } from "@prisma/client";

export interface IPrescricaoRepository extends IGenericRepository<Prescricao> {

}
