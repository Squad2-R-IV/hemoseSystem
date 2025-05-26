import type { status_exame_enum, tipo_exame_enum } from "~/utils/enums/enums";

export class CreateExameDto {
    
    
    id_paciente!: number;
    
    tipo_do_exame!: tipo_exame_enum;
    
    resultado?: string;
    
    dt_exame!: Date;
    
    profissional_responsavel!: string;
    
    crm_profissional_responsavel!: string;
    
    status!: status_exame_enum;
}
