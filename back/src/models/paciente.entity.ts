import { AutoMap } from "@automapper/classes";
import { AgendamentoEntity } from "./agendamento.entity";

export class PacienteEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    nome_paciente!: string;
    @AutoMap()
    dt_nascimento!: Date;
    @AutoMap()
    idade!: number;
    @AutoMap()
    sexo!: string;
    @AutoMap()
    estado_civil!: string;
    @AutoMap()
    endereco!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    cpf_acompanhante!: string;
    @AutoMap(() => [AgendamentoEntity])
    agendamentos?: AgendamentoEntity[];
}