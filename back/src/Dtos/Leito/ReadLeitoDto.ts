import { AutoMap } from "@automapper/classes";

export class ReadLeitoDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    numero_leito!: number;
    
    @AutoMap()
    status!: string;
    
    @AutoMap()
    observacoes?: string;
    
    LeitoConsultas?: any[];
} 