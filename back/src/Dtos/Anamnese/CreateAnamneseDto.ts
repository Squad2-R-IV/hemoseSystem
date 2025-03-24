import { AutoMap } from "@automapper/classes";

export class CreateAnamneseDto {
    @AutoMap()
    id_consulta!: number;
    @AutoMap()
    id_funcionario!: string;
    @AutoMap()
    cid!: string;
    @AutoMap()
    queixa_principal!: string | null;
    @AutoMap()
    historia_doenca_atual!: string | null;
    @AutoMap()
    antecedentes_pessoais!: string | null;
    @AutoMap()
    antecedentes_familiares!: string | null;
    @AutoMap()
    habitos_vida!: string | null;
    @AutoMap()
    medicamentos_em_uso!: string | null;
    @AutoMap()
    alergias!: string | null;
    @AutoMap()
    cirurgias_previas!: string | null;
    @AutoMap()
    observacoes!: string | null;
}
