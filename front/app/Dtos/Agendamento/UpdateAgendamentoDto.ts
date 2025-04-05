export class UpdateAgendamentoDto {
    id_paciente?: number;
    id_funcionario?: string;
    data_hora_agendamento?: Date;
    tipo_agendamento?: string; // Changed from TipoAgendamentoEnum to string
    status_agendamento?: string; // Changed from StatusAgendamentoEnum to string
    observacoes?: string;
}