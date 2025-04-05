export class UpdatePrescricaoDto {
  id_consulta?: number;
  dt_prescricao?: Date;
  dieta?: string | null;
  decubito?: string | null;
  cuidados_especiais?: string | null;
  fisioterapia?: string | null;
  balanco_hidrico?: boolean | null;
  observacoes?: string | null;
}
