import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadUserDto } from "../User/ReadUser.dto";

export class ReadAnamneseDto {
    @AutoMap()
    id!: number;
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
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    @AutoMap(() => ReadUserDto)
    User?: ReadUserDto;
}
