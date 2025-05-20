import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";


export class UpdateConsultaDto {
    
    dt_entrada?: Date
    
    dt_saida: Date | null | undefined;
    
    status!: status_consulta_enum;
}