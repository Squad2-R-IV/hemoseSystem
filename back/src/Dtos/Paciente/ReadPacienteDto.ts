import { AutoMap } from "@automapper/classes";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { Sexo, EstadoCivil } from "@prisma/client";

export class ReadPacienteDto {
    @AutoMap()
    id!: number;
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
    @AutoMap(() => [ReadAgendamentoDto])
    agendamentos?: ReadAgendamentoDto[];
}