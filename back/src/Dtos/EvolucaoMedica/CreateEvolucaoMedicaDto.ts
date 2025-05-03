import { AutoMap } from "@automapper/classes";
import { CreateExameFisicoDto } from "../ExameFisico/CreateExameFisicoDto";

export class CreateEvolucaoMedicaDto {
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    sintomas?: string;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => CreateExameFisicoDto)
    ExameFisico?: CreateExameFisicoDto;
} 