import type { status_consulta_enum } from "~/utils/enums/enums";

export class UpdateConsultaDto {

    dt_entrada?: Date;

    dt_saida?: Date | null;

    status!: status_consulta_enum;
}