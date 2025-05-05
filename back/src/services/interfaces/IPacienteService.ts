import { PacienteEntity } from "../../models/paciente.entity";
import { IGenericService } from "./IGenericService";

export interface IPacienteService extends IGenericService<PacienteEntity> {
    findPacienteByCpf(cpf: string): Promise<PacienteEntity | null>;
}