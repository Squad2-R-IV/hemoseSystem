import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";
import { AgendamentoEntity } from "./agendamento.entity";
import { AnamneseEntity } from "./anamnese.entity";

export class ConsultaEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_agendamento!: number;
    @AutoMap()
    procedimento!: tipo_procedimento_enum;
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    dt_saida!: Date | null;
    @AutoMap()
    status!: status_consulta_enum;
    @AutoMap()
    observacoes!: string;
    @AutoMap(() => AgendamentoEntity)
    Agendamento?: AgendamentoEntity;
    @AutoMap(() => AnamneseEntity)
    Anamnese?: AnamneseEntity;
}