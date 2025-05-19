import { AutoMap } from "@automapper/classes";
import { AgendamentoEntity } from "./agendamento.entity";
import { EstadoCivil, Sexo } from "@prisma/client";

export class PacienteEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    nome_paciente!: string;
    @AutoMap()
    dt_nascimento!: Date;
    @AutoMap()
    sexo!: Sexo;
    @AutoMap()
    estado_civil!: EstadoCivil;
    @AutoMap()
    endereco!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    cpf_acompanhante!: string;
    @AutoMap(() => [AgendamentoEntity])
    agendamentos?: AgendamentoEntity[];
}