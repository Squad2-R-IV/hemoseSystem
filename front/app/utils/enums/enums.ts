export const StatusAgendamentoEnum = {
  Agendado: 'Agendado',
  Confirmado: 'Confirmado',
  Realizado: 'Realizado',
  Cancelado: 'Cancelado',
  Reagendado: 'Reagendado'
};

export type StatusAgendamentoEnum = (typeof StatusAgendamentoEnum)[keyof typeof StatusAgendamentoEnum];

export const TipoAgendamentoEnum = {
  Consulta: 'Consulta',
  Exame: 'Exame',
  Procedimento: 'Procedimento'
};

export type TipoAgendamentoEnum = (typeof TipoAgendamentoEnum)[keyof typeof TipoAgendamentoEnum];

export const tipo_procedimento_enum = {
  PROCEDIMENTO_A: 'PROCEDIMENTO_A',
  PROCEDIMENTO_B: 'PROCEDIMENTO_B'
};

export type tipo_procedimento_enum = (typeof tipo_procedimento_enum)[keyof typeof tipo_procedimento_enum];



export const status_consulta_enum = {
  REALIZADA: 'REALIZADA',
  AGUARDANDO: 'AGUARDANDO',
  EM_ATENDIMENTO: 'EM_ATENDIMENTO', 
  CHAMADO: 'CHAMADO',
  AGUARDANDO_ACOLHIMENTO: 'AGUARDANDO_ACOLHIMENTO',
  ENFERMARIA: 'ENFERMARIA',
  CANCELADO: 'CANCELADO',
};

export type status_consulta_enum = (typeof status_consulta_enum)[keyof typeof status_consulta_enum];



export const Sexo = {
  M: "Masculino",
  F: "Feminino",
  O: "Outro",
};

export type Sexo = (typeof Sexo)[keyof typeof Sexo];

export const EstadoCivil = {
  S: "Solteiro",
  C: "Casado",
  D: "Divorciado",
  V: "Viúvo",
};

export type EstadoCivil = (typeof EstadoCivil)[keyof typeof EstadoCivil];


export const status_exame_enum = {
  PENDENTE: 'PENDENTE',
  REALIZADO: 'REALIZADO'
};

export type status_exame_enum = (typeof status_exame_enum)[keyof typeof status_exame_enum]


export const tipo_exame_enum = {
  SANGUE: 'SANGUE',
  URINA: 'URINA',
  FEZES: 'FEZES',
  IMAGEM: 'IMAGEM',
  ENDOSCOPICO: 'ENDOSCOPICO',
  OUTRO: 'OUTRO'
};

export type tipo_exame_enum = (typeof tipo_exame_enum)[keyof typeof tipo_exame_enum]



export const tipo_alta_enum = {
  OBITO: 'OBITO',
  CURA: 'CURA',
  TRANSFERENCIA: 'TRANSFERENCIA',
  ALTA: 'ALTA',
  EVASAO: 'EVASAO',
  OUTRO: 'OUTRO'
};

export type tipo_alta_enum = (typeof tipo_alta_enum)[keyof typeof tipo_alta_enum]