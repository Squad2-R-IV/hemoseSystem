import type { Sexo, EstadoCivil } from "~/utils/enums/enums";

export class CreatePacienteDto {
    nome_paciente!: string;
    dt_nascimento!: Date;
    sexo!: Sexo;
    estado_civil!: EstadoCivil;
    endereco!: string;
    cpf!: string;
    cpf_acompanhante!: string;
}