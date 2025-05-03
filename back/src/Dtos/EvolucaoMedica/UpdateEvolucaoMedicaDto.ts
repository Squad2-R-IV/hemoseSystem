import { AutoMap } from "@automapper/classes";
import { UpdateExameFisicoDto } from "../ExameFisico/UpdateExameFisicoDto";

export class UpdateEvolucaoMedicaDto {
    @AutoMap()
    id_funcionario?: string;
    
    @AutoMap()
    sintomas?: string;
    
    @AutoMap()
    observacoes?: string;
    
    @AutoMap(() => UpdateExameFisicoDto)
    ExameFisico?: UpdateExameFisicoDto;
} 