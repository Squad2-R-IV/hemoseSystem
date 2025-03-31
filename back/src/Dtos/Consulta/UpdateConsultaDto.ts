import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";


export class UpdateConsultaDto {
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    dt_saida: Date | null | undefined;
    @AutoMap()
    status!: status_consulta_enum;
}