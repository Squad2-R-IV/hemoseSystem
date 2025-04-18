import { AutoMap } from "@automapper/classes";

export class CreatePacienteDto {
    @AutoMap()
    nome_paciente!: string;
    @AutoMap()
    dt_nascimento!: Date;
    @AutoMap()
    idade!: number;
    @AutoMap()
    sexo!: string;
    @AutoMap()
    estado_civil!: string;
    @AutoMap()
    endereco!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    cpf_acompanhante!: string;
}