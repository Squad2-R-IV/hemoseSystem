
import { Paciente } from "@prisma/client";
import { IGenericService } from "./IGenericService";

export interface IPacienteService extends IGenericService<Paciente> {
    findPacienteByCpf(cpf: string): Promise<Paciente | null>;
}