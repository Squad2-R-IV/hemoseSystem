import { Agendamento, Paciente, User, Consulta, Auditoria, Anamnese, Conduta } from "@prisma/client";

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
  Condutas?: Conduta[];
};

export type AuditoriaWithRelations = Auditoria & {
  Usuario?: User;
};

export type AnamneseWithRelations = Anamnese & {
  Consulta?: Consulta;
  User?: User;
};



export type CondutaWithRelations = Conduta & {
  User?: User;
  Consulta?: Consulta;
}
