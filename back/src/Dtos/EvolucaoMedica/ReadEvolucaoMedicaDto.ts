import { AutoMap } from "@automapper/classes";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadEvolucaoMedicaDto {
  id!: number;
 id_consulta!: number;
 id_funcionario!: string;
  dt_evolucao!: Date;
  queixas!: string | null;
  exame_fisico!: string | null;
  conduta!: string;
  observacoes!: string | null;	
  Usuario?: ReadUserDto;
  Consulta?: ReadConsultaDto;
}
