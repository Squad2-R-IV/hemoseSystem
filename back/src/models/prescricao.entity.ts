import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";

export class PrescricaoEntity {
  @AutoMap()
  id!: number;

  @AutoMap()
  id_consulta!: number;

  @AutoMap()
  dt_prescricao!: Date;

  @AutoMap()
  dieta!: string | null;

  @AutoMap()
  decubito!: string | null;

  @AutoMap()
  cuidados_especiais!: string | null;

  @AutoMap()
  fisioterapia!: string | null;

  @AutoMap()
  balanco_hidrico!: boolean | null;

  @AutoMap()
  observacoes!: string | null;

  @AutoMap(() => ConsultaEntity)
  Consulta?: ConsultaEntity;
}
