import type { StatusAgendamentoEnum, TipoAgendamentoEnum } from "~/utils/enums/enums";

export class CreateAgendamentoDto {
    
    id_paciente!: number;
    
    id_funcionario!: string;
    
    data_hora_agendamento!: Date;
    
    tipo_agendamento!: TipoAgendamentoEnum;
    
    status_agendamento!: StatusAgendamentoEnum;
    
    observacoes?: string;
}