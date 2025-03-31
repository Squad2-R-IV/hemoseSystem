// import { AutoMap } from "@automapper/classes";
// import { tipo_procedimento_enum } from "@prisma/client";
import type { status_consulta_enum } from "~/utils/enums/enums";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";

export class ReadConsultaDto {
    // @AutoMap()
    id_consulta!: number;
    // @AutoMap()
    id_agendamento!: number;
    // @AutoMap()
    procedimento!: string; // Changed from tipo_procedimento_enum to string
    // @AutoMap()
    dt_entrada!: Date;
    // @AutoMap()
    dt_saida: Date | null | undefined;
    // @AutoMap()
    status!: status_consulta_enum;
    // @AutoMap()
    observacoes!: string;
    // @AutoMap(() => [ReadAnamneseDto])
    Anamneses!: ReadAnamneseDto[];
}
