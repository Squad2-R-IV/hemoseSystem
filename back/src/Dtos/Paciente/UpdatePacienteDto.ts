import { AutoMap } from "@automapper/classes";
import { Sexo, EstadoCivil } from "@prisma/client";

export class UpdatePacienteDto {
    
    nome_paciente?: string;
    
    dt_nascimento?: Date;
    
    idade?: number;
    
    sexo!: Sexo;
    
    estado_civil!: EstadoCivil;
    
    endereco?: string;
    
    cpf?: string;
    
    cpf_acompanhante?: string;
}