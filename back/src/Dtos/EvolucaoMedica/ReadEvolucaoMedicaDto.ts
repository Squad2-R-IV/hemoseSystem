import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";
import { ReadExameFisicoDto } from "../ExameFisico/ReadExameFisicoDto";

export class ReadEvolucaoMedicaDto {
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
    
    @AutoMap(() => ReadExameFisicoDto)
    ExameFisico?: ReadExameFisicoDto;
    
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    
    @AutoMap(() => ReadUserDto)
    Funcionario?: ReadUserDto;
} 