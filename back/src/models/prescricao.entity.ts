import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";
import { CondutaEntity } from "./conduta.entity";

export class PrescricaoEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    dt_prescricao!: Date;
    
    @AutoMap()
    dieta?: string;
    
    @AutoMap()
    decubito?: string;
    
    @AutoMap()
    cuidados_especiais?: string;
    
    @AutoMap()
    fisioterapia?: string;
    
    @AutoMap()
    balanco_hidrico!: boolean;
    
    @AutoMap()
    observacoes!: string;
    
    @AutoMap(() => ConsultaEntity)
    Consulta?: ConsultaEntity;
    
    @AutoMap(() => [CondutaEntity])
    Condutas?: CondutaEntity[];
} 