import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";
import { UpdateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/UpdateEvolucaoMedicaDto";

export const evolucaoMedicaEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getEvolucoesMedicas: builder.query<
    ReadEvolucaoMedicaDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `evolucao-medica?includeRelations=${includeRelations}`,
    }),
    providesTags: ["EvolucaoMedica"],
  }),
  
  getEvolucaoMedicaById: builder.query<
    ReadEvolucaoMedicaDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `evolucao-medica/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["EvolucaoMedica"],
  }),
  
  createEvolucaoMedica: builder.mutation<ReadEvolucaoMedicaDto, CreateEvolucaoMedicaDto>({
    query: (body) => ({
      url: "evolucao-medica",
      method: "POST",
      body,
    }),
    invalidatesTags: ["EvolucaoMedica"],
  }),
  
  updateEvolucaoMedica: builder.mutation<
    ReadEvolucaoMedicaDto,
    { id: number; body: UpdateEvolucaoMedicaDto }
  >({
    query: ({ id, body }) => ({
      url: `evolucao-medica/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["EvolucaoMedica"],
  }),
  
  deleteEvolucaoMedica: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `evolucao-medica/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["EvolucaoMedica"],
  }),
  
  getEvolucoesMedicasByConsultaId: builder.query<
    ReadEvolucaoMedicaDto[],
    { consultaId: number }
  >({
    query: ({ consultaId }) => ({
      url: `evolucao-medica/consulta?consultaId=${consultaId}`,
    }),
    providesTags: ["EvolucaoMedica"],
  }),
});
