import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";
import { LeitoEntity } from "./leito.entity";

export class LeitoConsultaEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_leito!: number;
    
    @AutoMap()
    dt_entrada!: Date;
    
    @AutoMap()
    dt_saida?: Date;
    
    @AutoMap(() => ConsultaEntity)
    Consulta?: ConsultaEntity;
    
    @AutoMap(() => LeitoEntity)
    Leito?: LeitoEntity;
} 