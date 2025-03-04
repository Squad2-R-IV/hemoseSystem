import { AutoMap } from "@automapper/classes";
import { tipo_procedimento_enum } from "@prisma/client";

export class ReadHistoricoDto {
    @AutoMap()
    id_historico!: number;
    @AutoMap()
    id_agendamento!: number;
    @AutoMap()
    procedimento!: tipo_procedimento_enum;
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    dt_saida: Date | null | undefined;
    @AutoMap()
    status!: string;
    @AutoMap()
    observacoes!: string;
}
