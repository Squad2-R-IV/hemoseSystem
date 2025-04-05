import { ReadPrescricaoDto } from "../Prescricao/ReadPrescricaoDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadCondutaDto {
  id!: number;
  id_prescricao!: number;
  id_funcionario!: string;
  dt_conduta!: Date;
  conduta!: string;
  Prescricao?: ReadPrescricaoDto;
  User?: ReadUserDto;
}
