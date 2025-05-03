import { AutoMap } from "@automapper/classes";

export class CreateTriagemDto {
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    peso!: number;
    
    @AutoMap()
    altura!: number;
    
    @AutoMap()
    pressao_arterial!: string;
    
    @AutoMap()
    temperatura!: number;
    
    @AutoMap()
    saturacao_oxigenio!: number;
    
    @AutoMap()
    glicemia?: number;
    
    @AutoMap()
    classificacao_risco!: string;
    
    @AutoMap()
    observacoes?: string;
} 