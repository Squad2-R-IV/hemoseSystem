export class UpdateEvolucaoMedicaDto {
  id_consulta!: number;
  id_funcionario?: string;
  dt_evolucao?: Date;
  queixas?: string | null;
  exame_fisico?: string | null;
  conduta?: string;
  observacoes?: string | null;
}
