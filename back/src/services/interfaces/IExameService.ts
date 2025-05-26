import { Exame } from "@prisma/client";
import { IGenericService } from "./IGenericService";

export interface IExameService extends IGenericService<Exame> {
    findExamesByPacienteId(pacienteId: number): Promise<Exame[]>;
    findExamesByStatus(status: string): Promise<Exame[]>;
}
