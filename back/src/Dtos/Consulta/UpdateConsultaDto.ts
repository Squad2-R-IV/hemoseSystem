
import { status_consulta_enum } from "@prisma/client";


export class UpdateConsultaDto {
    
    dt_entrada?: Date
    
    dt_saida: Date | null | undefined;
    
    status!: status_consulta_enum;
}