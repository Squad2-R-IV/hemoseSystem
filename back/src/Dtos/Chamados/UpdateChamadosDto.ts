import { AutoMap } from "@automapper/classes";
import { StatusChamadoEnum } from "../../models/chamados.entity";

export class UpdateChamadosDto {
    @AutoMap()
    id_usuario?: string;
    
    @AutoMap()
    tipo_problema?: string;
    
    @AutoMap()
    descricao?: string;
    
    @AutoMap()
    status?: StatusChamadoEnum;
    
    @AutoMap()
    dt_resolucao?: Date;
} 