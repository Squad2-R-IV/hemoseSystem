import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateAgendamentoDto } from "~/Dtos/Agendamento/CreateAgendamentoDto";
import { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import { UpdateAgendamentoDto } from "~/Dtos/Agendamento/UpdateAgendamentoDto";

export const agendamentoEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getAgendamentos: builder.query<
    ReadAgendamentoDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `agendamento?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Agendamento"],
  }),

  getAgendamentoById: builder.query<
    ReadAgendamentoDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `agendamento/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Agendamento"],
  }),

  createAgendamento: builder.mutation<
    ReadAgendamentoDto,
    CreateAgendamentoDto
  >({
    query: (body) => ({
      url: "agendamento",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Agendamento"],
  }),

  updateAgendamento: builder.mutation<
    ReadAgendamentoDto,
    { id: number; body: UpdateAgendamentoDto }
  >({
    query: ({ id, body }) => ({
      url: `agendamento/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Agendamento"],
  }),

  deleteAgendamento: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `agendamento/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Agendamento"],
  }),

  getAgendamentosComConsultasAtivas: builder.query<
    ReadAgendamentoDto[],
    void
  >({
    query: () => "agendamento/consultas-ativas",
    providesTags: ["Agendamento", "Consulta"],
  }),
  getAgendamentosNaEnfermaria: builder.query<
    ReadAgendamentoDto[],
    void
  >({
    query: () => "agendamento/consultas-enfermaria",
    providesTags: ["Agendamento", "Consulta"],
  }),


  getAgendamentosByDate: builder.query<
    ReadAgendamentoDto[],
    { date: string }
  >({
    query: ({ date }) => `agendamento/data/${date}`,
    providesTags: ["Agendamento"],
  }),
});
