import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";
import { ReadAltaMedicaDto } from "../AltaMedica/ReadAltaMedicaDto";
import { ReadPrescricaoDto } from "../Prescricao/ReadPrescricaoDto";
import { ReadTriagemDto } from "../Triagem/ReadTriagemDto";
import { ReadExamesDto } from "../Exames/ReadExamesDto";
import { ReadEvolucaoMedicaDto } from "../EvolucaoMedica/ReadEvolucaoMedicaDto";

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
    @AutoMap(() => ReadAltaMedicaDto)
    AltaMedica?: ReadAltaMedicaDto;
    @AutoMap(() => ReadPrescricaoDto)
    Prescricao?: ReadPrescricaoDto;
    @AutoMap(() => ReadTriagemDto)
    Triagem?: ReadTriagemDto;
    @AutoMap(() => [ReadExamesDto])
    Exames?: ReadExamesDto[];
    @AutoMap(() => [ReadEvolucaoMedicaDto])
    EvolucoesMedicas?: ReadEvolucaoMedicaDto[];
    LeitoConsultas?: any[];
}
