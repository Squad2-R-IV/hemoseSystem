import { tipo_alta_enum } from "@prisma/client";

export class CreateAltaMedicaDto {
  id_consulta!: number;
  id_medico!: string;
  dt_alta!: Date;
  tipo_alta!: tipo_alta_enum;
  relatorio!: string;
}

 