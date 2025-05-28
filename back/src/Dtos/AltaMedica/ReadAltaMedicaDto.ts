
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { tipo_alta_enum } from "@prisma/client";

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
