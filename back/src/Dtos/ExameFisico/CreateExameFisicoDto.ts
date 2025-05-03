import { AutoMap } from "@automapper/classes";

export class CreateExameFisicoDto {
    @AutoMap()
    id_anamnese?: number;
    
    @AutoMap()
    id_evolucao?: number;
    
    @AutoMap()
    frequencia_cardiaca?: number;
    
    @AutoMap()
    frequencia_respiratoria?: number;
    
    @AutoMap()
    pressao_arterial?: string;
    
    @AutoMap()
    saturacao_oxigenio?: number;
    
    @AutoMap()
    ausculta_cardiaca?: string;
    
    @AutoMap()
    ausculta_pulmonar?: string;
    
    @AutoMap()
    ausculta_abdominal?: string;
    
    @AutoMap()
    oroscopia?: string;
    
    @AutoMap()
    genitalia?: string;
    
    @AutoMap()
    sistema_nervoso?: string;
    
    @AutoMap()
    temperatura?: number;
    
    @AutoMap()
    observacoes?: string;
} 