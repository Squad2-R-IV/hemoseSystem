import { AutoMap } from "@automapper/classes";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "@prisma/client";
import { ConsultaEntity } from "./consulta.entity";
import { PacienteEntity } from "./paciente.entity";
import { UserEntity } from "./user.entity";

export class AgendamentoEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_paciente!: number;
    @AutoMap()
    id_funcionario!: string;
    @AutoMap()
    data_hora_agendamento!: Date;
    @AutoMap()
    tipo_agendamento!: TipoAgendamentoEnum;
    @AutoMap()
    status_agendamento!: StatusAgendamentoEnum;
    @AutoMap()
    observacoes!: string | null;

    @AutoMap(() => PacienteEntity)
    Paciente?: PacienteEntity;
    
    @AutoMap(() => UserEntity)
    Usuario?: UserEntity;
}