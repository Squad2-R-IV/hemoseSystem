import type { tipo_alta_enum } from "~/utils/enums/enums";
import type { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";


export class ReadAltaMedicaDto {
  id!: number;
  id_consulta!: number;
  id_medico!: string;
  dt_alta!: Date;
  tipo_alta!: tipo_alta_enum;
  relatorio!: string;
  medico?: ReadUserDto;
  consulta?: ReadConsultaDto;
}
