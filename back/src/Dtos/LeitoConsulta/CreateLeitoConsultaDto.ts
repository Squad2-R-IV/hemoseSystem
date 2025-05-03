import { AutoMap } from "@automapper/classes";

export class CreateLeitoConsultaDto {
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_leito!: number;
    
    @AutoMap()
    dt_saida?: Date;
} 