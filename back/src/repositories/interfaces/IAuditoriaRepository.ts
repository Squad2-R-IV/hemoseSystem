import { IGenericRepository } from "./IGenericRepository";
import { Auditoria } from "@prisma/client";

export interface IAuditoriaRepository extends IGenericRepository<Auditoria> {

}