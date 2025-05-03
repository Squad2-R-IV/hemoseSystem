import { AutoMap } from "@automapper/classes";
import { CondutaEntity } from "./conduta.entity";
import { UserEntity } from "./user.entity";

export class AdministracaoCondutaEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_conduta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    dt_administracao!: Date;
    
    @AutoMap()
    hora_administracao!: Date;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => CondutaEntity)
    Conduta?: CondutaEntity;
    
    @AutoMap(() => UserEntity)
    Funcionario?: UserEntity;
} 