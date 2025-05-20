import { AutoMap } from "@automapper/classes";
import { tipo_procedimento_enum } from "@prisma/client";

export class CreateConsultaDto {
    
    id_agendamento!: number;
    
    procedimento!: tipo_procedimento_enum;
    
    dt_entrada!: Date;
    
    observacoes!: string;
}
