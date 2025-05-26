
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";

export class ReadConsultaDto {
    
    id!: number;
    
    id_agendamento!: number;
    
    procedimento!: tipo_procedimento_enum;
    
    dt_entrada!: Date;
    
    dt_saida: Date | null | undefined;
    
    status!: status_consulta_enum;
    
    observacoes!: string;

    Anamnese?: ReadAnamneseDto;
 
    Agendamento?: ReadAgendamentoDto;

    Condutas?: ReadCondutaDto[];
}
