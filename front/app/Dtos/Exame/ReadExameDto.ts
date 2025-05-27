import type { tipo_exame_enum, status_exame_enum } from "~/utils/enums/enums";
import { ReadArquivoExameDto } from "../ArquivoExame/ReadArquivoExameDto"
import type { ReadPacienteDto } from "../Paciente/ReadPacienteDto";



export class ReadExameDto {
    
    id!: number;
    
    
    id_paciente!: number;
    
    tipo_do_exame!: tipo_exame_enum;
    
    resultado?: string;
    
    dt_exame!: Date;
    
    profissional_responsavel!: string;
    
    crm_profissional_responsavel!: string;
    
    status!: status_exame_enum;

    Paciente?: ReadPacienteDto;

}
