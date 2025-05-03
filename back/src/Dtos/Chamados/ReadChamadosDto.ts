import { AutoMap } from "@automapper/classes";
import { StatusChamadoEnum } from "../../models/chamados.entity";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadChamadosDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_usuario!: string;
    
    @AutoMap()
    tipo_problema!: string;
    
    @AutoMap()
    descricao!: string;
    
    @AutoMap()
    status!: StatusChamadoEnum;
    
    @AutoMap()
    dt_abertura!: Date;
    
    @AutoMap()
    dt_resolucao?: Date;
    
    @AutoMap(() => ReadUserDto)
    Usuario?: ReadUserDto;
} 