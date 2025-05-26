import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateAnamneseDto } from "~/Dtos/Anamnese/CreateAnamneseDto";
import { ReadAnamneseDto } from "~/Dtos/Anamnese/ReadAnamneseDto";
import { UpdateAnamneseDto } from "~/Dtos/Anamnese/UpdateAnamneseDto";

export const anamneseEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getAnamneses: builder.query<
    ReadAnamneseDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `anamnese?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Anamnese"],
  }),
  
  getAnamneseById: builder.query<
    ReadAnamneseDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `anamnese/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Anamnese"],
  }),
  
  createAnamnese: builder.mutation<ReadAnamneseDto, CreateAnamneseDto>({
    query: (body) => ({
      url: "anamnese",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Anamnese"],
  }),
  
  updateAnamnese: builder.mutation<
    ReadAnamneseDto,
    { id: number; body: UpdateAnamneseDto }
  >({
    query: ({ id, body }) => ({
      url: `anamnese/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Anamnese"],
  }),
  
  deleteAnamnese: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `anamnese/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Anamnese"],
  }),
});
