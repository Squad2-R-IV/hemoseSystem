import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";

export class ReadPacienteDto {
    id!: number;
    nome_paciente!: string;
    dt_nascimento!: Date;
    idade!: number;
    sexo!: string;
    estado_civil!: string;
    endereco!: string;
    cpf!: string;
    cpf_acompanhante!: string;
    agendamentos!: ReadAgendamentoDto[];
}