// import { AutoMap } from "@automapper/classes";
// import { tipo_procedimento_enum } from "@prisma/client";
import type { status_consulta_enum } from "~/utils/enums/enums";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";
import type { ReadCondutaDto } from "../Conduta/ReadCondutaDto";

export class ReadConsultaDto {
    // 
    id!: number;
    // 
    id_agendamento!: number;
    // 
    procedimento!: string; // Changed from tipo_procedimento_enum to string
    // 
    dt_entrada!: Date;
    // 
    dt_saida: Date | null | undefined;
    // 
    status!: status_consulta_enum;
    // 
    observacoes!: string;
    //  => [ReadAnamneseDto])
    Anamnese!: ReadAnamneseDto;
    Condutas?: ReadCondutaDto[];
}
