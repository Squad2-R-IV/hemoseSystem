
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";

export class ReadUserDto{
    
    id!: string;
    
    name!: string;
    
    email!: string;
    
    cpf!: string;
    
    contato!: string;
    
    status!: string;
    
    especialidade?: string;
    
    conselho?: string;
    
    registro?: string;

    agendamentos?: ReadAgendamentoDto[];

    Anamneses?: ReadAnamneseDto[];
}

