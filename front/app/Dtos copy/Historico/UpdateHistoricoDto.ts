import type { tipo_procedimento_enum } from "~/utils/enums/enums";

export class UpdateHistoricoDto {
    procedimento!: tipo_procedimento_enum;
    dt_entrada!: Date;
    dt_saida: Date | null | undefined;
    status!: string;
    observacoes!: string;
}