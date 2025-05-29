import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/CreateEvolucaoEnfermagemDto";
import { ReadEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/ReadEvolucaoEnfermagemDto";
import { UpdateEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/UpdateEvolucaoEnfermagemDto";

export const evolucaoEnfermagemEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getEvolucoesEnfermagem: builder.query<
    ReadEvolucaoEnfermagemDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `evolucao-enfermagem?includeRelations=${includeRelations}`,
    }),
    providesTags: ["EvolucaoEnfermagem"],
  }),
  
  getEvolucaoEnfermagemById: builder.query<
    ReadEvolucaoEnfermagemDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `evolucao-enfermagem/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["EvolucaoEnfermagem"],
  }),
  
  createEvolucaoEnfermagem: builder.mutation<ReadEvolucaoEnfermagemDto, CreateEvolucaoEnfermagemDto>({
    query: (body) => ({
      url: "evolucao-enfermagem",
      method: "POST",
      body,
    }),
    invalidatesTags: ["EvolucaoEnfermagem"],
  }),
  
  updateEvolucaoEnfermagem: builder.mutation<
    ReadEvolucaoEnfermagemDto,
    { id: number; body: UpdateEvolucaoEnfermagemDto }
  >({
    query: ({ id, body }) => ({
      url: `evolucao-enfermagem/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["EvolucaoEnfermagem"],
  }),
  
  deleteEvolucaoEnfermagem: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `evolucao-enfermagem/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["EvolucaoEnfermagem"],
  }),
  
  getEvolucoesEnfermagemByConsultaId: builder.query<
    ReadEvolucaoEnfermagemDto[],
    { consultaId: number }
  >({
    query: ({ consultaId }) => ({
      url: `evolucao-enfermagem/consulta?consultaId=${consultaId}`,
    }),
    providesTags: ["EvolucaoEnfermagem"],
  }),
});
