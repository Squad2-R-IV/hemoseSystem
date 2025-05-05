import { Agendamento, Paciente, User, Consulta, Auditoria, Anamnese, Conduta } from "@prisma/client";

// Tipos para novos modelos que ainda não foram gerados no Prisma Client
interface AltaMedica {
  id: number;
  id_consulta: number;
  id_medico: string;
  dt_alta: Date;
  tipo_alta: string;
  observacoes?: string | null;
}

interface Chamados {
  id: number;
  id_usuario: string;
  tipo_problema: string;
  descricao: string;
  status: string;
  dt_abertura: Date;
  dt_resolucao?: Date | null;
}

interface Prescricao {
  id: number;
  id_consulta: number;
  dt_prescricao: Date;
  dieta?: string | null;
  decubito?: string | null;
  cuidados_especiais?: string | null;
  fisioterapia?: string | null;
  balanco_hidrico: boolean;
  observacoes: string;
}

interface AdministracaoConduta {
  id: number;
  id_conduta: number;
  id_funcionario: string;
  dt_administracao: Date;
  hora_administracao: Date;
  observacoes?: string | null;
}

interface Triagem {
  id: number;
  id_consulta: number;
  id_funcionario: string;
  dt_triagem: Date;
  peso: number;
  altura: number;
  pressao_arterial: string;
  temperatura: number;
  saturacao_oxigenio: number;
  glicemia?: number | null;
  classificacao_risco: string;
  observacoes?: string | null;
}

interface Exames {
  id: number;
  id_consulta: number;
  id_funcionario: string;
  tipo_do_exame: string;
  resultado?: string | null;
  dt_exame: Date;
  profissional_responsavel: string;
  status: string;
}

interface EvolucaoMedica {
  id: number;
  id_consulta: number;
  id_funcionario: string;
  dt_evolucao: Date;
  sintomas?: string | null;
  observacoes?: string | null;
}

interface ExameFisico {
  id: number;
  id_anamnese?: number | null;
  id_evolucao?: number | null;
  frequencia_cardiaca?: number | null;
  frequencia_respiratoria?: number | null;
  pressao_arterial?: string | null;
  saturacao_oxigenio?: number | null;
  ausculta_cardiaca?: string | null;
  ausculta_pulmonar?: string | null;
  ausculta_abdominal?: string | null;
  oroscopia?: string | null;
  genitalia?: string | null;
  sistema_nervoso?: string | null;
  temperatura?: number | null;
  observacoes?: string | null;
}

interface Leito {
  id: number;
  numero_leito: number;
  status: string;
  observacoes?: string | null;
}

interface LeitoConsulta {
  id: number;
  id_consulta: number;
  id_leito: number;
  dt_entrada: Date;
  dt_saida?: Date | null;
}

export type AgendamentoWithRelations = Agendamento & {
  Paciente?: Paciente;
  Usuario?: User;
  Consulta?: Consulta;
};

export type PacienteWithRelations = Paciente & {
  agendamentos?: Agendamento[];
};

export type UserWithRelations = User & {
  agendamentos?: Agendamento[];
  auditorias?: Auditoria[];
  Anamneses?: Anamnese[];
  Condutas?: Conduta[];
  Chamados?: Chamados[];
  AltasMedicas?: AltaMedica[];
  TriagensRealizadas?: Triagem[];
  ExamesRealizados?: Exames[];
  EvolucoesMedicas?: EvolucaoMedica[];
  AdministracoesCondutas?: AdministracaoConduta[];
};

export type ConsultaWithRelations = Consulta & {
  Agendamento?: Agendamento;
  Anamnese?: Anamnese;
  Condutas?: Conduta[];
  AltaMedica?: AltaMedica;
  Prescricao?: Prescricao;
  Triagem?: Triagem;
  Exames?: Exames[];
  EvolucoesMedicas?: EvolucaoMedica[];
  LeitoConsultas?: LeitoConsulta[];
};

export type AuditoriaWithRelations = Auditoria & {
  Usuario?: User;
};

export type AnamneseWithRelations = Anamnese & {
  Consulta?: Consulta;
  User?: User;
  ExameFisico?: ExameFisico;
};

export type CondutaWithRelations = Conduta & {
  User?: User;
  Consulta?: Consulta;
  Prescricao?: Prescricao;
  AdministracoesCondutas?: AdministracaoConduta[];
};

export type AltaMedicaWithRelations = AltaMedica & {
  Consulta?: Consulta;
  Medico?: User;
};

export type ChamadosWithRelations = Chamados & {
  Usuario?: User;
};

export type PrescricaoWithRelations = Prescricao & {
  Consulta?: Consulta;
  Condutas?: Conduta[];
};

export type AdministracaoCondutaWithRelations = AdministracaoConduta & {
  Conduta?: Conduta;
  Funcionario?: User;
};

export type TriagemWithRelations = Triagem & {
  Consulta?: Consulta;
  Funcionario?: User;
};

export type ExamesWithRelations = Exames & {
  Consulta?: Consulta;
  Funcionario?: User;
};

export type EvolucaoMedicaWithRelations = EvolucaoMedica & {
  Consulta?: Consulta;
  Funcionario?: User;
  ExameFisico?: ExameFisico;
};

export type ExameFisicoWithRelations = ExameFisico & {
  Anamnese?: Anamnese;
  EvolucaoMedica?: EvolucaoMedica;
};

export type LeitoWithRelations = Leito & {
  LeitoConsultas?: LeitoConsulta[];
};

export type LeitoConsultaWithRelations = LeitoConsulta & {
  Consulta?: Consulta;
  Leito?: Leito;
};
