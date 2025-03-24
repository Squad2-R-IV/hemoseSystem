import type { StatusAgendamentoEnum, TipoAgendamentoEnum } from "~/utils/enums/enums";
import { ReadPacienteDto } from "../Paciente/ReadPacienteDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import type { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadAgendamentoDto {
    id_agendamento!: number;
    id_paciente!: number;
    id_funcionario!: string;
    data_hora_agendamento!: Date;
    tipo_agendamento!: TipoAgendamentoEnum;
    status_agendamento!: StatusAgendamentoEnum;
    observacoes?: string;
    Paciente?: ReadPacienteDto;
    Usuario?: ReadUserDto;
    Consulta?: ReadConsultaDto;
}