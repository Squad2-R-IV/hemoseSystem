import { AutoMap } from "@automapper/classes";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { Sexo, EstadoCivil } from "@prisma/client";

export class ReadPacienteDto {
    
    id!: number;
    
    nome_paciente!: string;
    
    dt_nascimento!: Date;
    
    idade!: number;
    
    sexo!: Sexo;
    
    estado_civil!: EstadoCivil;
    
    endereco!: string;
    
    cpf!: string;
    
    cpf_acompanhante!: string;

    agendamentos?: ReadAgendamentoDto[];
}