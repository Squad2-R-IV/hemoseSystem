import { AutoMap } from "@automapper/classes";

export class UpdateCondutaDto {
  @AutoMap()
  id_consulta?: number;

  @AutoMap()
  id_funcionario?: string;
  
  @AutoMap()
  id_prescricao?: number;

  @AutoMap()
  conduta?: string;
}
