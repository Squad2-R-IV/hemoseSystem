import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";

export class ReadPrescricaoDto {
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
    
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    
    @AutoMap(() => [ReadCondutaDto])
    Condutas?: ReadCondutaDto[];
} 