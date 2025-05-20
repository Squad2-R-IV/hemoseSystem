import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadAnamneseDto {
    
    
        id!: number;
        
        id_consulta!: number;
        
        id_funcionario!: string;
        
        cid!: string;
        
        queixa_principal!: string | null;
        
        historia_doenca_atual!: string | null;
        
        antecedentes_pessoais!: string | null;
        
        antecedentes_familiares!: string | null;
        
        habitos_vida!: string | null;
        
        medicamentos_em_uso!: string | null;
        
        alergias!: string | null;
        
        cirurgias_previas!: string | null;
        
        observacoes!: string | null;
  
        Consulta?: ReadConsultaDto;
        
        User?: ReadUserDto;
}
