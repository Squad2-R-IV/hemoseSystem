import { Agendamento, Paciente, User, Consulta, Auditoria, Anamnese, Prescricao, Conduta } from "@prisma/client";

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
};

export type ConsultaWithRelations = Consulta & {
  Agendamento?: Agendamento;
  Anamnese?: Anamnese;
};

export type AuditoriaWithRelations = Auditoria & {
  Usuario?: User;
};

export type AnamneseWithRelations = Anamnese & {
  Consulta?: Consulta;
  User?: User;
};

export type PrescricaoWithRelations = Prescricao & {
  Consulta?: Consulta;
  Condutas?: Conduta[];
}

export type CondutaWithRelations = Conduta & {
  Prescricao?: Prescricao;
  User?: User;
}
