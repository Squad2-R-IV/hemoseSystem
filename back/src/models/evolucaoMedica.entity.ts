import { AutoMap } from "@automapper/classes";
import { ConsultaEntity } from "./consulta.entity";
import { UserEntity } from "./user.entity";
import { ExameFisicoEntity } from "./exameFisico.entity";

export class EvolucaoMedicaEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    dt_evolucao!: Date;
    
    @AutoMap()
    sintomas?: string;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => ExameFisicoEntity)
    ExameFisico?: ExameFisicoEntity;
    
    @AutoMap(() => ConsultaEntity)
    Consulta?: ConsultaEntity;
    
    @AutoMap(() => UserEntity)
    Funcionario?: UserEntity;
} 