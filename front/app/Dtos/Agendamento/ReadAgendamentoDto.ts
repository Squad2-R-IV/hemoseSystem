import type { StatusAgendamentoEnum, TipoAgendamentoEnum } from "~/utils/enums/enums";
import { ReadPacienteDto } from "../Paciente/ReadPacienteDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import type { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadAgendamentoDto {
    id!: number;
    id_paciente!: number;
    id_funcionario!: string;
    dt_agendamento!: Date;
    dt_hora_agendamento!: number;
    tipo_agendamento!: TipoAgendamentoEnum;
    status_agendamento!: StatusAgendamentoEnum;
    observacoes?: string;
    dt_chegada?: Date;
    Paciente?: ReadPacienteDto;
    Usuario?: ReadUserDto;
    Consulta?: ReadConsultaDto;
}