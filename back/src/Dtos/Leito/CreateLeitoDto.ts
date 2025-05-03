import { AutoMap } from "@automapper/classes";

export class CreateLeitoDto {
    @AutoMap()
    numero_leito!: number;
    
    @AutoMap()
    status!: string;
    
    @AutoMap()
    observacoes?: string;
} 