import { AutoMap } from "@automapper/classes";
import { ReadPrescricaoDto } from "../Prescricao/ReadPrescricaoDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadCondutaDto {
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

  @AutoMap(() => ReadPrescricaoDto)
  Prescricao?: ReadPrescricaoDto;

  @AutoMap(() => ReadUserDto)
  User?: ReadUserDto;
}
