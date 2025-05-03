import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";
import { UserEntity } from "./user.entity";

export class ExamesEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    tipo_do_exame!: string;
    
    @AutoMap()
    resultado?: string;
    
    @AutoMap()
    dt_exame!: Date;
    
    @AutoMap()
    profissional_responsavel!: string;
    
    @AutoMap()
    status!: string;
    
    @AutoMap(() => ConsultaEntity)
    Consulta?: ConsultaEntity;
    
    @AutoMap(() => UserEntity)
    Funcionario?: UserEntity;
} 