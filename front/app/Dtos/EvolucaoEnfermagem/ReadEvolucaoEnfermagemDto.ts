
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadEvolucaoEnfermagemDto {
  id!: number;
  id_consulta!: number;
  id_funcionario!: string;
  dt_evolucao!: Date;
  sinais_vitais?: string | null;
  conduta_enfermagem?: string | null;
  observacoes?: string | null;
  Funcionario?: ReadUserDto;
  Consulta?: ReadConsultaDto;
}
