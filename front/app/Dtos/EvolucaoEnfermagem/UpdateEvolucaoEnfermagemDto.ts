

export class UpdateEvolucaoEnfermagemDto {
  id_consulta?: number;
  id_funcionario?: string;
  dt_evolucao?: Date;
  sinais_vitais?: string | null;
  conduta_enfermagem?: string | null;
  observacoes?: string | null;
}
