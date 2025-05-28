import type { tipo_alta_enum } from "~/utils/enums/enums";


export class UpdateAltaMedicaDto {
  id_consulta?: number;
  id_medico?: string;
  dt_alta?: Date;
  tipo_alta?: tipo_alta_enum;
  relatorio?: string;
}
