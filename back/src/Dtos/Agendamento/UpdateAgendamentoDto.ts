import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";

export class UpdateAgendamentoDto {
    @AutoMap()
    dt_agendamento?: Date;
    @AutoMap()
    dt_hora_agendamento?: number;
    @AutoMap()
    dt_chegada!: Date | null;
    @AutoMap()
    tipo_agendamento?: TipoAgendamentoEnum;
    @AutoMap()
    status_agendamento?: StatusAgendamentoEnum;
    @AutoMap()
    observacoes?: string;
}