import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";
import { UserEntity } from "./user.entity";

export enum TipoAltaEnum {
    Com_Atestado = "Com_Atestado",
    Sem_Atestado = "Sem_Atestado",
    Transferencia = "Transferencia",
    Evasao = "Evasao",
    Outro = "Outro"
}

export class AltaMedicaEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_medico!: string;
    
    @AutoMap()
    dt_alta!: Date;
    
    @AutoMap()
    tipo_alta!: TipoAltaEnum;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => ConsultaEntity)
    Consulta?: ConsultaEntity;
    
    @AutoMap(() => UserEntity)
    Medico?: UserEntity;
} 