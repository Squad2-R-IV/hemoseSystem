import { IGenericRepository } from "./IGenericRepository";
import { Paciente } from "@prisma/client";

export interface IPacienteRepository extends IGenericRepository<Paciente> {

}