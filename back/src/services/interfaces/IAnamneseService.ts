import { IGenericService } from "./IGenericService";
import { Anamnese } from "@prisma/client";

export interface IAnamneseService extends IGenericService<Anamnese> {
  // Define additional methods specific to AnamneseService if needed
}
