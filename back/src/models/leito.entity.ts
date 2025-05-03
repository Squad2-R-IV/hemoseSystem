import { AutoMap } from "@automapper/classes";
import { LeitoConsultaEntity } from "./leitoConsulta.entity";

export class LeitoEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    numero_leito!: number;
    
    @AutoMap()
    status!: string;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => [LeitoConsultaEntity])
    LeitoConsultas?: LeitoConsultaEntity[];
} 