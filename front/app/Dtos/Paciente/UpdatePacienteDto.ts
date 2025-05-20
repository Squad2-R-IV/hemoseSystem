// import { AutoMap } from "@automapper/classes";

import type { Sexo, EstadoCivil } from "~/utils/enums/enums";

export class UpdatePacienteDto {
    // 
    nome_paciente?: string;
    // 
    dt_nascimento?: Date;
    sexo!: Sexo;
    estado_civil!: EstadoCivil;
    // 
    endereco?: string;
    // 
    cpf?: string;
    // 
    cpf_acompanhante?: string;
}