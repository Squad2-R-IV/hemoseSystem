import { AutoMap } from "@automapper/classes";
import { Sexo, EstadoCivil } from "@prisma/client";

export class CreatePacienteDto {
    @AutoMap()
    nome_paciente!: string;
    @AutoMap()
    dt_nascimento!: Date;
    @AutoMap()
    idade!: number;
    @AutoMap()
    sexo!: Sexo;
    @AutoMap()
    estado_civil!: EstadoCivil;
    @AutoMap()
    endereco!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    cpf_acompanhante!: string;
}