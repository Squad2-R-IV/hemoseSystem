import type { Sexo, EstadoCivil } from "~/utils/enums/enums";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";

export class ReadPacienteDto {
    id!: number;
    nome_paciente!: string;
    dt_nascimento!: Date;
    sexo!: Sexo;
    estado_civil!: EstadoCivil;
    endereco!: string;
    cpf!: string;
    cpf_acompanhante!: string;
    agendamentos!: ReadAgendamentoDto[];
}