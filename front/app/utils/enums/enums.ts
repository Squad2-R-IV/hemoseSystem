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
  CANCELADO: 'CANCELADO',
};

export type status_consulta_enum = (typeof status_consulta_enum)[keyof typeof status_consulta_enum];
