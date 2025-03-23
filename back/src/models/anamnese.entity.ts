import { AutoMap } from "@automapper/classes";
import { HistoricoEntity } from "./historico.entity";
import { UserEntity } from "./user.entity";

export class AnamneseEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_historico!: number;
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
    @AutoMap(() => HistoricoEntity)
    Historico?: HistoricoEntity;
    @AutoMap(() => UserEntity)
    User?: UserEntity;
}
