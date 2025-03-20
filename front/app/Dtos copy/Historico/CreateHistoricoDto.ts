import type { tipo_procedimento_enum } from "~/utils/enums/enums";

export class CreateHistoricoDto {
    id_agendamento!: number;
    procedimento!: tipo_procedimento_enum;
    dt_entrada!: Date;
    status!: string;
    observacoes!: string;
}
