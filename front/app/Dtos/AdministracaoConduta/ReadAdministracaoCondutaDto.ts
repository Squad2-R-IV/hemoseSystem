import type { StatusAgendamentoEnum, TipoAgendamentoEnum } from "~/utils/enums/enums";
import { ReadPacienteDto } from "../Paciente/ReadPacienteDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import type { ReadConsultaDto } from "../Consulta/ReadConsultaDto";

export class ReadAdministracaoCondutaDto {
    id!: number;
    id_conduta!: number;
    
    id_funcionario!: string;
    
    dt_administracao!: Date;
    
    dt_hora_agendamento!: number;
    
    observacoes?: string;
}