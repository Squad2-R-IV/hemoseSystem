import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";
import { ReadUserDto } from "../User/ReadUser.dto";


export class ReadAdministracaoCondutaDto {
    id!: number;
    id_conduta!: number;
    
    id_funcionario!: string;
    
    dt_administracao!: Date;
    
    observacoes?: string;

    Conduta?: ReadCondutaDto;
    Funcionario?: ReadUserDto;


}