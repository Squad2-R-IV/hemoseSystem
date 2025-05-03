import { AutoMap } from "@automapper/classes";

export class UpdateLeitoDto {
    @AutoMap()
    numero_leito?: number;
    
    @AutoMap()
    status?: string;
    
    @AutoMap()
    observacoes?: string;
} 