import { AutoMap } from "@automapper/classes";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { Sexo, EstadoCivil, Raca } from "@prisma/client";

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

    raca?: Raca;

    naturalidade?: string;

    nacionalidade?: string;

    nm_pai?: string;

    nm_mae?: string;

    rg_num?: string;

    rg_org?: string;

    cns?: string;

    dt_cadastro?: Date;

    numero?: string;

    bairro?: string;

    cidade?: string;
    
    uf?: string;

    cep?: string;

    celular_i?: string;

    celular_ii?: string;

    email?: string;

    abo?: string;

    tem_alergia?: string;
    
    qual_alergia?: string;
}