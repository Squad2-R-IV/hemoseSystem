import { Agendamento, Paciente, User, Consulta, Auditoria, Anamnese, Conduta, EvolucaoMedica, Exame, ArquivoExame, AltaMedica, AdministracaoConduta, EvolucaoEnfermagem } from "@prisma/client";

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
  AdmministracaoCondutas?: AdministracaoConduta[];
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

export type AltaMedicaWithRelations = AltaMedica & {
  Consulta?: Consulta;
  Medico?: User;
};

export type AdministracaoCondutaWithRelations = AdministracaoConduta & {
  Conduta?: Conduta;
  Funcionario?: User;
};

export type EvolucaoEnfermagemWithRelations = EvolucaoEnfermagem & {
  Funcionario?: User;
  Consulta?: Consulta;
}

