import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";

export class AgendamentoEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_paciente!: number;
    @AutoMap()
    id_funcionario!: string;
    @AutoMap()
    data_hora_agendamento!: Date;
    @AutoMap()
    tipo_agendamento!: TipoAgendamentoEnum;
    @AutoMap()
    status_agendamento!: StatusAgendamentoEnum;
    @AutoMap()
    observacoes!: string | null;
}