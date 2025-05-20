import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";

export class CreateAgendamentoDto {
    
    id_paciente!: number;
    
    id_funcionario!: string;
    
    dt_agendamento!: Date;
    
    dt_hora_agendamento!: number;
    
    dt_chegada!: Date | null;
    
    tipo_agendamento!: TipoAgendamentoEnum;
    
    status_agendamento!: StatusAgendamentoEnum;
    
    observacoes?: string;
}