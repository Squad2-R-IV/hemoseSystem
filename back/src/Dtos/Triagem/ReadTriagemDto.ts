import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadTriagemDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    dt_triagem!: Date;
    
    @AutoMap()
    peso!: number;
    
    @AutoMap()
    altura!: number;
    
    @AutoMap()
    pressao_arterial!: string;
    
    @AutoMap()
    temperatura!: number;
    
    @AutoMap()
    saturacao_oxigenio!: number;
    
    @AutoMap()
    glicemia?: number;
    
    @AutoMap()
    classificacao_risco!: string;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    
    @AutoMap(() => ReadUserDto)
    Funcionario?: ReadUserDto;
} 