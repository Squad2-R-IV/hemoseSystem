import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";
import { ReadPacienteDto } from "../Paciente/ReadPacienteDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadAgendamentoDto {
    
    id!: number;
    
    id_paciente!: number;
    
    id_funcionario!: string;
    
    dt_agendamento!: Date;
    
    dt_hora_agendamento!: number;
    
    dt_chegada!: Date | null;
    
    tipo_agendamento!: TipoAgendamentoEnum;
    
    status_agendamento!: StatusAgendamentoEnum;
    
    observacoes?: string;

    Paciente?: ReadPacienteDto;

    Usuario?: ReadUserDto;

    Consulta?: ReadConsultaDto;
}