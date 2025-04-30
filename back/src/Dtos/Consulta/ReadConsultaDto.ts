import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";

export class ReadConsultaDto {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_agendamento!: number;
    @AutoMap()
    procedimento!: tipo_procedimento_enum;
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    dt_saida: Date | null | undefined;
    @AutoMap()
    status!: status_consulta_enum;
    @AutoMap()
    observacoes!: string;
    @AutoMap(() => ReadAnamneseDto)
    Anamnese?: ReadAnamneseDto;
    @AutoMap(() => ReadAgendamentoDto)
    Agendamento?: ReadAgendamentoDto;
    @AutoMap(() => [ReadCondutaDto])
    Condutas?: ReadCondutaDto[];
}
