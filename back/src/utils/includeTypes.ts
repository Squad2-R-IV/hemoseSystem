import { Agendamento, Paciente, User, Consulta, Auditoria, Anamnese, Conduta, EvolucaoMedica, Exame, ArquivoExame } from "@prisma/client";

export type AgendamentoWithRelations = Agendamento & {
  Paciente?: Paciente;
  Usuario?: User;
  Consulta?: Consulta;
};

export type PacienteWithRelations = Paciente & {
  agendamentos?: Agendamento[];
  exames?: Exame[];
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

export type EvolucaoMedicaWithRelations = EvolucaoMedica & {
  Usuario?: User;
  Consulta?: Consulta;
};

export type ExameWithRelations = Exame & {
  Paciente?: Paciente;
};

export type ArquivoExameWithRelations = ArquivoExame & {
  Exame?: Exame;
};

