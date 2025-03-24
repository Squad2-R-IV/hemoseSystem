// import { AutoMap } from "@automapper/classes";
// import { tipo_procedimento_enum } from "@prisma/client";
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
    status!: string;
    // @AutoMap()
    observacoes!: string;
    // @AutoMap(() => [ReadAnamneseDto])
    Anamneses!: ReadAnamneseDto[];
}
