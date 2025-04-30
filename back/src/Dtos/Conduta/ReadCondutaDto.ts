import { AutoMap } from "@automapper/classes";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadCondutaDto {
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
  @AutoMap(() => ReadUserDto)
  User?: ReadUserDto;
  @AutoMap(() => ReadConsultaDto)
  Consulta?: ReadConsultaDto;
}
