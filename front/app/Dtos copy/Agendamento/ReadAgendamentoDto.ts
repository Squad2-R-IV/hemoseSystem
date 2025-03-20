import type { TipoAgendamentoEnum, StatusAgendamentoEnum } from "~/utils/enums/enums";

export class ReadAgendamentoDto {
    id_agendamento!: number;
    id_paciente!: number;
    id_funcionario!: string;
    data_hora_agendamento!: Date;
    tipo_agendamento!: TipoAgendamentoEnum;
    status_agendamento!: StatusAgendamentoEnum;
    observacoes?: string;
}