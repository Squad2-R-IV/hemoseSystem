import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadExamesDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    tipo_do_exame!: string;
    
    @AutoMap()
    resultado?: string;
    
    @AutoMap()
    dt_exame!: Date;
    
    @AutoMap()
    profissional_responsavel!: string;
    
    @AutoMap()
    status!: string;
    
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    
    @AutoMap(() => ReadUserDto)
    Funcionario?: ReadUserDto;
} 