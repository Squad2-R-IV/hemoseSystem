import { AutoMap } from "@automapper/classes";

export class ReadPrescricaoDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  id_consulta!: number;

  @AutoMap()
  dt_prescricao!: Date;

  @AutoMap()
  dieta?: string | null;

  @AutoMap()
  decubito?: string | null;

  @AutoMap()
  cuidados_especiais?: string | null;

  @AutoMap()
  fisioterapia?: string | null;

  @AutoMap()
  balanco_hidrico?: boolean | null;

  @AutoMap()
  observacoes?: string | null;
}
