import { AutoMap } from "@automapper/classes";
import { tipo_procedimento_enum } from "@prisma/client";
import { AgendamentoEntity } from "./agendamento.entity";
import { AnamneseEntity } from "./anamnese.entity";

export class HistoricoEntity {
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
    status!: string;
    @AutoMap()
    observacoes!: string;
    @AutoMap(() => AgendamentoEntity)
    Agendamento?: AgendamentoEntity;
    @AutoMap(() => [AnamneseEntity])
    Anamneses?: AnamneseEntity[];
}