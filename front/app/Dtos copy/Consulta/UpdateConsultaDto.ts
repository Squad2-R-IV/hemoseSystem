export class UpdateConsultaDto {
    procedimento!: string; // Changed from tipo_procedimento_enum to string
    dt_entrada!: Date;
    dt_saida: Date | null | undefined;
    status!: string;
    observacoes!: string;
}