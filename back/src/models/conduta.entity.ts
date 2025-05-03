import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { ConsultaEntity } from "./consulta.entity";
import { PrescricaoEntity } from "./prescricao.entity";
import { AdministracaoCondutaEntity } from "./administracaoConduta.entity";

export class CondutaEntity {
  @AutoMap()
  id!: number;

  @AutoMap()
  id_consulta!: number;

  @AutoMap()
  id_funcionario!: string;

  @AutoMap()
  id_prescricao?: number;

  @AutoMap()
  dt_conduta!: Date;

  @AutoMap()
  conduta!: string;

  @AutoMap(() => ConsultaEntity)
  Consulta?: ConsultaEntity;

  @AutoMap(() => UserEntity)
  User?: UserEntity;

  @AutoMap(() => PrescricaoEntity)
  Prescricao?: PrescricaoEntity;

  @AutoMap(() => [AdministracaoCondutaEntity])
  AdministracoesCondutas?: AdministracaoCondutaEntity[];
}
