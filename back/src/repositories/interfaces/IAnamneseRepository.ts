import { IGenericRepository } from "./IGenericRepository";
import { Anamnese } from "@prisma/client";

export interface IAnamneseRepository extends IGenericRepository<Anamnese> {}
