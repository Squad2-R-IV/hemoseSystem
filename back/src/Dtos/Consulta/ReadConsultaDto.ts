import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";

export class ReadConsultaDto {
    @AutoMap()
    id_consulta!: number;
    @AutoMap()
    id_agendamento!: number;
    @AutoMap()
    procedimento!: tipo_procedimento_enum;
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    dt_saida: Date | null | undefined;
    @AutoMap()
    status!: status_consulta_enum;
    @AutoMap()
    observacoes!: string;
    @AutoMap(() => [ReadAnamneseDto])
    Anamneses?: ReadAnamneseDto[];
}
