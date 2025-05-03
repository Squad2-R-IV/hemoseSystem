import { AutoMap } from "@automapper/classes";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadPrescricaoDto } from "../Prescricao/ReadPrescricaoDto";
import { ReadAdministracaoCondutaDto } from "../AdministracaoConduta/ReadAdministracaoCondutaDto";

export class ReadCondutaDto {
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

  @AutoMap(() => ReadUserDto)
  User?: ReadUserDto;

  @AutoMap(() => ReadConsultaDto)
  Consulta?: ReadConsultaDto;

  @AutoMap(() => ReadPrescricaoDto)
  Prescricao?: ReadPrescricaoDto;

  @AutoMap(() => [ReadAdministracaoCondutaDto])
  AdministracoesCondutas?: ReadAdministracaoCondutaDto[];
}
