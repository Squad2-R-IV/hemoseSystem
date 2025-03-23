import { AutoMap } from "@automapper/classes";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";

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
    sexo!: string;
    @AutoMap()
    estado_civil!: string;
    @AutoMap()
    endereco!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    cpf_acompanhante!: string;
    @AutoMap(() => [ReadAgendamentoDto])
    agendamentos?: ReadAgendamentoDto[];
}