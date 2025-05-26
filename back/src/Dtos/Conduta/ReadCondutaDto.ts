
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadCondutaDto {
  
  id!: number;

  
  id_consulta!: number;

  
  id_funcionario!: string;

  
  dt_conduta!: Date;

  
  conduta!: string;

  User?: ReadUserDto;
  Consulta?: ReadConsultaDto;
}
