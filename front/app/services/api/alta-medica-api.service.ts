import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateAltaMedicaDto } from "~/Dtos/AltaMedica/CreateAltaMedicaDto";
import { ReadAltaMedicaDto } from "~/Dtos/AltaMedica/ReadAltaMedicaDto";
import { UpdateAltaMedicaDto } from "~/Dtos/AltaMedica/UpdateAltaMedicaDto";

export const altaMedicaEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getAltasMedicas: builder.query<
    ReadAltaMedicaDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `alta-medica?includeRelations=${includeRelations}`,
    }),
    providesTags: ["AltaMedica"],
  }),
  
  getAltaMedicaById: builder.query<
    ReadAltaMedicaDto,
    { id: number; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `alta-medica/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["AltaMedica"],
  }),  
  createAltaMedica: builder.mutation<ReadAltaMedicaDto, CreateAltaMedicaDto>({
    query: (body) => ({
      url: "alta-medica",
      method: "POST",
      body,
    }),
    invalidatesTags: ["AltaMedica", "Consulta"],
  }),
  
  updateAltaMedica: builder.mutation<
    ReadAltaMedicaDto,
    { id: number; body: UpdateAltaMedicaDto }
  >({
    query: ({ id, body }) => ({
      url: `alta-medica/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["AltaMedica"],
  }),
  
  deleteAltaMedica: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `alta-medica/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["AltaMedica"],
  }),
    getAltaMedicaByConsultaId: builder.query<
    ReadAltaMedicaDto | null,
    { consultaId: number }
  >({
    query: ({ consultaId }) => ({
      url: `alta-medica/consulta?consultaId=${consultaId}`,
    }),
    providesTags: ["AltaMedica"],
  }),
});
