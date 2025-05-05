// import { AutoMap } from "@automapper/classes";

import type { Sexo, EstadoCivil } from "~/utils/enums/enums";

export class UpdatePacienteDto {
    // @AutoMap()
    nome_paciente?: string;
    // @AutoMap()
    dt_nascimento?: Date;
    sexo!: Sexo;
    estado_civil!: EstadoCivil;
    // @AutoMap()
    endereco?: string;
    // @AutoMap()
    cpf?: string;
    // @AutoMap()
    cpf_acompanhante?: string;
}