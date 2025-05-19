import type { StatusAgendamentoEnum, TipoAgendamentoEnum } from "~/utils/enums/enums";

export class CreateAgendamentoDto {
    
    id_paciente!: number;
    
    id_funcionario!: string;
    
    dt_agendamento!: Date;
    
    dt_hora_agendamento!: number;
    
    dt_chegada?: Date;
    
    tipo_agendamento!: TipoAgendamentoEnum;
    
    status_agendamento!: StatusAgendamentoEnum;
    
    observacoes?: string;
}