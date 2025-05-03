import { AutoMap } from "@automapper/classes";
import { TipoAltaEnum } from "../../models/altaMedica.entity";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadAltaMedicaDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_medico!: string;
    
    @AutoMap()
    dt_alta!: Date;
    
    @AutoMap()
    tipo_alta!: TipoAltaEnum;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    
    @AutoMap(() => ReadUserDto)
    Medico?: ReadUserDto;
} 