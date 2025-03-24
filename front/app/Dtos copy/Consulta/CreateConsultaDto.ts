export class CreateConsultaDto {
    id_agendamento!: number;
    procedimento!: string; // Changed from tipo_procedimento_enum to string
    dt_entrada!: Date;
    status!: string;
    observacoes!: string;
}
