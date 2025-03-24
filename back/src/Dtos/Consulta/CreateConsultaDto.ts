import { AutoMap } from "@automapper/classes";
import { tipo_procedimento_enum } from "@prisma/client";

export class CreateConsultaDto {
    @AutoMap()
    id_agendamento!: number;
    @AutoMap()
    procedimento!: tipo_procedimento_enum;
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    status!: string;
    @AutoMap()
    observacoes!: string;
}
