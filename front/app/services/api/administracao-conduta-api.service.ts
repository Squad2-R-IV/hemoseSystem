import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateAdministracaoCondutaDto } from "~/Dtos/AdministracaoConduta/CreateAdministracaoCondutaDto";
import { ReadAdministracaoCondutaDto } from "~/Dtos/AdministracaoConduta/ReadAdministracaoCondutaDto";
import { UpdateAdministracaoCondutaDto } from "~/Dtos/AdministracaoConduta/UpdateAdministracaoCondutaDto";

export const administracaoCondutaEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getAdministracaoCondutas: builder.query<
    ReadAdministracaoCondutaDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `administracao-conduta?includeRelations=${includeRelations}`,
    }),
    providesTags: ["AdministracaoConduta"],
  }),
  
  getAdministracaoCondutaById: builder.query<
    ReadAdministracaoCondutaDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `administracao-conduta/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["AdministracaoConduta"],
  }),
  
  createAdministracaoConduta: builder.mutation<ReadAdministracaoCondutaDto, CreateAdministracaoCondutaDto>({
    query: (body) => ({
      url: "administracao-conduta",
      method: "POST",
      body,
    }),
    invalidatesTags: ["AdministracaoConduta"],
  }),
  
  updateAdministracaoConduta: builder.mutation<
    ReadAdministracaoCondutaDto,
    { id: number; body: UpdateAdministracaoCondutaDto }
  >({
    query: ({ id, body }) => ({
      url: `administracao-conduta/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["AdministracaoConduta"],
  }),
  
  deleteAdministracaoConduta: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `administracao-conduta/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["AdministracaoConduta"],
  }),
  
  getAdministracaoCondutasByCondutaId: builder.query<
    ReadAdministracaoCondutaDto[],
    { condutaId: number }
  >({
    query: ({ condutaId }) => ({
      url: `administracao-conduta/conduta?condutaId=${condutaId}`,
    }),
    providesTags: ["AdministracaoConduta"],
  }),
});
