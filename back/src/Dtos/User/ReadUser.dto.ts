import { AutoMap } from "@automapper/classes";
import { ReadAgendamentoDto } from "../Agendamento/ReadAgendamentoDto";
import { ReadAnamneseDto } from "../Anamnese/ReadAnamneseDto";
import { ReadCondutaDto } from "../Conduta/ReadCondutaDto";
import { ReadChamadosDto } from "../Chamados/ReadChamadosDto";
import { ReadAltaMedicaDto } from "../AltaMedica/ReadAltaMedicaDto";
import { ReadTriagemDto } from "../Triagem/ReadTriagemDto";
import { ReadExamesDto } from "../Exames/ReadExamesDto";
import { ReadEvolucaoMedicaDto } from "../EvolucaoMedica/ReadEvolucaoMedicaDto";
import { ReadAdministracaoCondutaDto } from "../AdministracaoConduta/ReadAdministracaoCondutaDto";

export class ReadUserDto{
    @AutoMap()
    id!: string;
    @AutoMap()
    name!: string;
    @AutoMap()
    email!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    contato!: string;
    @AutoMap()
    status!: string;
    @AutoMap()
    especialidade?: string;
    @AutoMap()
    conselho?: string;
    @AutoMap()
    registro?: string;
    @AutoMap(() => [ReadAgendamentoDto])
    agendamentos?: ReadAgendamentoDto[];
    @AutoMap(() => [ReadAnamneseDto])
    Anamneses?: ReadAnamneseDto[];
    @AutoMap(() => [ReadCondutaDto])
    Condutas?: ReadCondutaDto[];
    @AutoMap(() => [ReadChamadosDto])
    Chamados?: ReadChamadosDto[];
    @AutoMap(() => [ReadAltaMedicaDto])
    AltasMedicas?: ReadAltaMedicaDto[];
    @AutoMap(() => [ReadTriagemDto])
    TriagensRealizadas?: ReadTriagemDto[];
    @AutoMap(() => [ReadExamesDto])
    ExamesRealizados?: ReadExamesDto[];
    @AutoMap(() => [ReadEvolucaoMedicaDto])
    EvolucoesMedicas?: ReadEvolucaoMedicaDto[];
    @AutoMap(() => [ReadAdministracaoCondutaDto])
    AdministracoesCondutas?: ReadAdministracaoCondutaDto[];
}

