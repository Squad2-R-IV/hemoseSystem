import { ReadArquivoExameDto } from "../ArquivoExame/ReadArquivoExameDto"
import { ReadPacienteDto } from "../Paciente/ReadPacienteDto";



export class ReadExameDto {
    
    id!: number;
    
    
    id_paciente!: number;
    
    tipo_do_exame!: string;
    
    resultado?: string;
    
    dt_exame!: Date;
    
    profissional_responsavel!: string;
    
    crm_profissional_responsavel!: string;
    
    status!: string;
    Paciente?: ReadPacienteDto;
}
