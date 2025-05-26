import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateExameDto } from "~/Dtos/Exame/CreateExameDto";
import { ReadExameDto } from "~/Dtos/Exame/ReadExameDto";
import type { UpdateExameDto } from "~/Dtos/Exame/UpdateExameDto";
import type { status_exame_enum } from "~/utils/enums/enums";

export const exameEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getExames: builder.query<ReadExameDto[], void>({
    query: () => ({
      url: "exame",
    }),
    providesTags: ["Exame"],
  }),
  
  getExameById: builder.query<ReadExameDto, number>({
    query: (id) => ({
      url: `exame/${id}`,
    }),
    providesTags: ["Exame"],
  }),
  
  createExame: builder.mutation<ReadExameDto, CreateExameDto>({
    query: (body) => ({
      url: "exame",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Exame"],
  }),
  
  updateExame: builder.mutation<ReadExameDto, { id: number; body: UpdateExameDto }>({
    query: ({ id, body }) => ({
      url: `exame/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Exame"],
  }),
  
  deleteExame: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `exame/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Exame"],
  }),
  
  getExamesByPaciente: builder.query<ReadExameDto[], number>({
    query: (pacienteId) => ({
      url: `exame/paciente/${pacienteId}`,
    }),
    providesTags: ["Exame"],
  }),
  
  getExamesByStatus: builder.query<ReadExameDto[], status_exame_enum>({
    query: (status) => ({
      url: `exame/status/${status}`,
    }),
    providesTags: ["Exame"],
  }),
});
