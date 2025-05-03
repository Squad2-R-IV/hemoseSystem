import { AutoMap } from "@automapper/classes";
import { TipoAltaEnum } from "../../models/altaMedica.entity";

export class UpdateAltaMedicaDto {
    @AutoMap()
    id_consulta?: number;
    
    @AutoMap()
    id_medico?: string;
    
    @AutoMap()
    tipo_alta?: TipoAltaEnum;
    
    @AutoMap()
    observacoes?: string;
} 