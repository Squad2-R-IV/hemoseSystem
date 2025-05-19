import type { TipoAgendamentoEnum, StatusAgendamentoEnum } from "~/utils/enums/enums";

export class UpdateAgendamentoDto {
    dt_agendamento!: Date;
    dt_hora_agendamento!: number;
    tipo_agendamento!: TipoAgendamentoEnum;
    status_agendamento!: StatusAgendamentoEnum;
    observacoes?: string;
    dt_chegada?: Date;
}