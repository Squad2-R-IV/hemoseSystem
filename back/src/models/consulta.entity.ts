import { AutoMap } from "@automapper/classes";
import { status_consulta_enum, tipo_procedimento_enum } from "@prisma/client";
import { AgendamentoEntity } from "./agendamento.entity";
import { AnamneseEntity } from "./anamnese.entity";
import { CondutaEntity } from "./conduta.entity";
import { AltaMedicaEntity } from "./altaMedica.entity";
import { PrescricaoEntity } from "./prescricao.entity";
import { TriagemEntity } from "./triagem.entity";
import { ExamesEntity } from "./exames.entity";
import { EvolucaoMedicaEntity } from "./evolucaoMedica.entity";
import { LeitoConsultaEntity } from "./leitoConsulta.entity";

export class ConsultaEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_agendamento!: number;
    @AutoMap()
    procedimento!: tipo_procedimento_enum;
    @AutoMap()
    dt_entrada!: Date;
    @AutoMap()
    dt_saida!: Date | null;
    @AutoMap()
    status!: status_consulta_enum;
    @AutoMap()
    observacoes!: string;
    @AutoMap(() => AgendamentoEntity)
    Agendamento?: AgendamentoEntity;
    @AutoMap(() => AnamneseEntity)
    Anamnese?: AnamneseEntity;
    @AutoMap(() => [CondutaEntity])
    Condutas?: CondutaEntity[];
    @AutoMap(() => AltaMedicaEntity)
    AltaMedica?: AltaMedicaEntity;
    @AutoMap(() => PrescricaoEntity)
    Prescricao?: PrescricaoEntity;
    @AutoMap(() => TriagemEntity)
    Triagem?: TriagemEntity;
    @AutoMap(() => [ExamesEntity])
    Exames?: ExamesEntity[];
    @AutoMap(() => [EvolucaoMedicaEntity])
    EvolucoesMedicas?: EvolucaoMedicaEntity[];
    @AutoMap(() => [LeitoConsultaEntity])
    LeitoConsultas?: LeitoConsultaEntity[];
}