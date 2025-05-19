import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";
import { ReadPacienteDto } from "../Paciente/ReadPacienteDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadAgendamentoDto {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_paciente!: number;
    @AutoMap()
    id_funcionario!: string;
    @AutoMap()
    dt_agendamento!: Date;
    @AutoMap()
    dt_hora_agendamento!: number;
    @AutoMap()
    dt_chegada!: Date | null;
    @AutoMap()
    tipo_agendamento!: TipoAgendamentoEnum;
    @AutoMap()
    status_agendamento!: StatusAgendamentoEnum;
    @AutoMap()
    observacoes?: string;
    @AutoMap(() => ReadPacienteDto)
    Paciente?: ReadPacienteDto;
    @AutoMap(() => ReadUserDto)
    Usuario?: ReadUserDto;
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
}