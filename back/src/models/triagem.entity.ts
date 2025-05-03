import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";
import { UserEntity } from "./user.entity";

export class TriagemEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    dt_triagem!: Date;
    
    @AutoMap()
    peso!: number;
    
    @AutoMap()
    altura!: number;
    
    @AutoMap()
    pressao_arterial!: string;
    
    @AutoMap()
    temperatura!: number;
    
    @AutoMap()
    saturacao_oxigenio!: number;
    
    @AutoMap()
    glicemia?: number;
    
    @AutoMap()
    classificacao_risco!: string;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => ConsultaEntity)
    Consulta?: ConsultaEntity;
    
    @AutoMap(() => UserEntity)
    Funcionario?: UserEntity;
} 