import type { status_consulta_enum, tipo_procedimento_enum } from "~/utils/enums/enums";

export class CreateConsultaDto {
    id_agendamento!: number;
    procedimento!: tipo_procedimento_enum; // Changed from tipo_procedimento_enum to string
    dt_entrada!: Date;
    status!: status_consulta_enum;
    observacoes!: string;
}
