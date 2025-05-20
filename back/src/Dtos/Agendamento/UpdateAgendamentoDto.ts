import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";

export class UpdateAgendamentoDto {
    
    dt_agendamento?: Date;
    
    dt_hora_agendamento?: number;
    
    dt_chegada!: Date | null;
    
    tipo_agendamento?: TipoAgendamentoEnum;
    
    status_agendamento?: StatusAgendamentoEnum;
    
    observacoes?: string;
}