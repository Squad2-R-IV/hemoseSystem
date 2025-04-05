import { AutoMap } from "@automapper/classes";
import { PrescricaoEntity } from "./prescricao.entity";
import { UserEntity } from "./user.entity";

export class CondutaEntity {
  @AutoMap()
  id!: number;

  @AutoMap()
  id_prescricao!: number;

  @AutoMap()
  id_funcionario!: string;

  @AutoMap()
  dt_conduta!: Date;

  @AutoMap()
  conduta!: string;

  @AutoMap(() => PrescricaoEntity)
  Prescricao?: PrescricaoEntity;

  @AutoMap(() => UserEntity)
  User?: UserEntity;
}
