import { AutoMap } from "@automapper/classes";
import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadAdministracaoCondutaDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_conduta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    dt_administracao!: Date;
    
    @AutoMap()
    hora_administracao!: Date;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => ReadCondutaDto)
    Conduta?: ReadCondutaDto;
    
    @AutoMap(() => ReadUserDto)
    Funcionario?: ReadUserDto;
} 