import { AutoMap } from "@automapper/classes";

export class UpdateCondutaDto {
  @AutoMap()
  id_prescricao?: number;

  @AutoMap()
  id_funcionario?: string;

  @AutoMap()
  conduta?: string;
}
