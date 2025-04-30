import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { ConsultaEntity } from "./consulta.entity";

export class CondutaEntity {
  @AutoMap()
  id!: number;

  @AutoMap()
  id_consulta!: number;

  @AutoMap()
  id_funcionario!: string;

  @AutoMap()
  dt_conduta!: Date;

  @AutoMap()
  conduta!: string;

  @AutoMap(() => ConsultaEntity)
  Consulta?: ConsultaEntity;

  @AutoMap(() => UserEntity)
  User?: UserEntity;
}
