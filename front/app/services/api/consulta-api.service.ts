import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateConsultaDto } from "~/Dtos/Consulta/CreateConsultaDto";
import { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";
import { UpdateConsultaDto } from "~/Dtos/Consulta/UpdateConsultaDto";
import { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";
import { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";

export const consultaEndpoints = (builder: EndpointBuilder<any, any, any>) => ({  getConsultas: builder.query<
    ReadConsultaDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `consulta?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Consulta"],
  }),
  
  getConsultasByPacientId: builder.query<
    ReadConsultaDto[],
    { pacienteId: number }
  >({
    query: ({ pacienteId }) => ({
      url: `consulta/paciente?pacienteId=${pacienteId}`,
    }),
    providesTags: ["Consulta"],
  }),
  
  getConsultaById: builder.query<
    { consulta: ReadConsultaDto; agendamento: ReadAgendamentoDto },
    { id: number; includeRelations?: boolean }
  >({
    queryFn: async (
      { id, includeRelations = false },
      api,
      extraOptions,
      baseQuery
    ) => {
      // First fetch the consulta
      const consultaResult = await baseQuery({
        url: `consulta/${id}?includeRelations=${includeRelations}`,
      });

      if (consultaResult.error) {
        return { error: consultaResult.error };
      }

      const consulta = consultaResult.data as ReadConsultaDto;

      // Then fetch the related agendamento
      const agendamentoResult = await baseQuery({
        url: `agendamento/${consulta.id_agendamento}?includeRelations=true`,
      });

      if (agendamentoResult.error) {
        return { error: agendamentoResult.error };
      }

      return {
        data: {
          consulta,
          agendamento: agendamentoResult.data as ReadAgendamentoDto,
        },
      };
    },
    providesTags: ["Consulta", "Agendamento"],
  }),
  
  createConsulta: builder.mutation<ReadConsultaDto, CreateConsultaDto>({
    query: (body) => ({
      url: "consulta",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Consulta"],
  }),
  
  updateConsulta: builder.mutation<
    ReadConsultaDto,
    { id: number; body: UpdateConsultaDto }
  >({
    query: ({ id, body }) => ({
      url: `consulta/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Consulta", "Agendamento"],
  }),
  
  deleteConsulta: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `consulta/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Consulta"],
  }),
  
  fetchAllConsultaDetails: builder.query<
    {
      consulta: ReadConsultaDto;
      condutas: ReadCondutaDto[];
      evolucoesMedicas: ReadEvolucaoMedicaDto[];
      agendamento: ReadAgendamentoDto;
    },
    { id: number; includeRelations?: boolean }
  >({
    queryFn: async (
      { id, includeRelations = false },
      api,
      extraOptions,
      baseQuery
    ) => {
      // First fetch the consulta
      const consultaResult = await baseQuery({
        url: `consulta/${id}?includeRelations=${includeRelations}`,
      });
      console.log("consultaResult", consultaResult);

      if (consultaResult.error) {
        return { error: consultaResult.error };
      }

      const consulta = consultaResult.data as ReadConsultaDto;

      // Fetch agendamento using id_agendamento from consulta
      const agendamentoResult = await baseQuery({
        url: `agendamento/${consulta.id_agendamento}?includeRelations=true`,
      });
      console.log("agendamentoResult", agendamentoResult);

      if (agendamentoResult.error) {
        return { error: agendamentoResult.error };
      }

      // Fetch condutas using fetchCondutasByConsultaId
      const condutasResult = await baseQuery({
        url: `conduta/consulta?consultaId=${id}`,
      });
      console.log("condutasResult", condutasResult);

      if (condutasResult.error) {
        return { error: condutasResult.error };
      }

      // Fetch evoluções médicas using getEvolucoesMedicasByConsultaId
      const evolucoesMedicasResult = await baseQuery({
        url: `evolucao-medica/consulta?consultaId=${id}`,
      });
      console.log("evolucoesMedicasResult", evolucoesMedicasResult);

      if (evolucoesMedicasResult.error) {
        return { error: evolucoesMedicasResult.error };
      }

      return {
        data: {
          consulta,
          condutas: condutasResult.data as ReadCondutaDto[],
          evolucoesMedicas: evolucoesMedicasResult.data as ReadEvolucaoMedicaDto[],
          agendamento: agendamentoResult.data as ReadAgendamentoDto,
        },
      };
    },
    providesTags: ["Consulta", "Conduta", "EvolucaoMedica", "Agendamento"],
  }),
});
