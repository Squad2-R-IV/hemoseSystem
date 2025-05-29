import type { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadPrescricaoDto } from "../Prescricao/ReadPrescricaoDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadAdministracaoCondutaDto } from "../AdministracaoConduta/ReadAdministracaoCondutaDto";

export class ReadCondutaDto {
  id!: number;
  id_consulta!: number;
  id_funcionario!: string;
  dt_conduta!: Date;
  conduta!: string;
  Prescricao?: ReadPrescricaoDto;
  User?: ReadUserDto;
  Consulta?: ReadConsultaDto;
  AdministracaoCondutas?: ReadAdministracaoCondutaDto[];
}
