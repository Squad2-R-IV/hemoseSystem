import { IGenericRepository } from "./IGenericRepository";
import { Exame } from "@prisma/client";

export interface IExameRepository extends IGenericRepository<Exame> {

}
