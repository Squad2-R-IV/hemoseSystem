import { AutoMap } from "@automapper/classes";

export class UpdatePrescricaoDto {
    @AutoMap()
    dieta?: string;
    
    @AutoMap()
    decubito?: string;
    
    @AutoMap()
    cuidados_especiais?: string;
    
    @AutoMap()
    fisioterapia?: string;
    
    @AutoMap()
    balanco_hidrico?: boolean;
    
    @AutoMap()
    observacoes?: string;
} 