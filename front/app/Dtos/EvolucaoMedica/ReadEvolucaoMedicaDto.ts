import type { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

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
