import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";
import { UpdateCondutaDto } from "~/Dtos/Conduta/UpdateCondutaDto";

export const condutaEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getCondutas: builder.query<
    ReadCondutaDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `conduta?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Conduta"],
  }),
  
  getCondutaById: builder.query<
    ReadCondutaDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `conduta/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Conduta"],
  }),
  
  createConduta: builder.mutation<ReadCondutaDto, CreateCondutaDto>({
    query: (body) => ({
      url: "conduta",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Conduta"],
  }),
  
  updateConduta: builder.mutation<
    ReadCondutaDto,
    { id: number; body: UpdateCondutaDto }
  >({
    query: ({ id, body }) => ({
      url: `conduta/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Conduta"],
  }),
  
  deleteConduta: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `conduta/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Conduta"],
  }),
  
  getCondutasByConsultaId: builder.query<
    ReadCondutaDto[],
    { consultaId: number }
  >({
    query: ({ consultaId }) => ({
      url: `conduta/consulta?consultaId=${consultaId}`,
    }),
    providesTags: ["Conduta"],
  }),
});
