import { Agendamento, Paciente, User, Consulta, Auditoria, Anamnese } from "@prisma/client";

export type AgendamentoWithRelations = Agendamento & {
  Paciente?: Paciente;
  Usuario?: User;
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
  Anamneses?: Anamnese[];
};

export type AuditoriaWithRelations = Auditoria & {
  Usuario?: User;
};

export type AnamneseWithRelations = Anamnese & {
  Consulta?: Consulta;
  User?: User;
};