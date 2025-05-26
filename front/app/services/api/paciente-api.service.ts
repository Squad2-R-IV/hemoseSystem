import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreatePacienteDto } from "~/Dtos/Paciente/CreatePacienteDto";
import { ReadPacienteDto } from "~/Dtos/Paciente/ReadPacienteDto";
import type { UpdatePacienteDto } from "~/Dtos/Paciente/UpdatePacienteDto";
import { CreateAgendamentoDto } from "~/Dtos/Agendamento/CreateAgendamentoDto";
import { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import { UpdateAgendamentoDto } from "~/Dtos/Agendamento/UpdateAgendamentoDto";
import { CreateConsultaDto } from "~/Dtos/Consulta/CreateConsultaDto";
import { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";

export const pacienteEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getPacientes: builder.query<ReadPacienteDto[], { includeRelations?: boolean }>({
    query: ({ includeRelations = false }) => ({
      url: `paciente?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Paciente"],
  }),
  
  getPacienteById: builder.query<ReadPacienteDto, { id: number; includeRelations?: boolean }>({
    query: ({ id, includeRelations = false }) => ({
      url: `paciente/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Paciente"],
  }),
  
  createPaciente: builder.mutation<ReadPacienteDto, CreatePacienteDto>({
    query: (body) => ({
      url: "paciente",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Paciente"],
  }),
  
  updatePaciente: builder.mutation<ReadPacienteDto, { id: number; body: UpdatePacienteDto }>({
    query: ({ id, body }) => ({
      url: `paciente/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Paciente"],
  }),
  
  deletePaciente: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `paciente/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Paciente"],
  }),
  
  getPacienteByCpf: builder.query<ReadPacienteDto, { cpf: string }>({
    query: ({ cpf }) => ({
      url: `paciente/cpf/${cpf}`,
    }),
    providesTags: ["Paciente"],
  }),
  
  reagendarAgendamento: builder.mutation<
    { oldAppointment: ReadAgendamentoDto, newAppointment: ReadAgendamentoDto },
    { 
      id: number; 
      updateDto: UpdateAgendamentoDto;
      newAppointmentDto: CreateAgendamentoDto 
    }
  >({
    async queryFn({ id, updateDto, newAppointmentDto }, _queryApi, _extraOptions, baseQuery) {
      try {
        // Step 1: Update the existing appointment to Reagendado status
        const updateResult = await baseQuery({
          url: `agendamento/${id}`,
          method: 'PUT',
          body: updateDto
        });
        
        if (updateResult.error) {
          return { error: updateResult.error };
        }
        
        // Step 2: Create a new appointment with the new date/time
        const createResult = await baseQuery({
          url: 'agendamento',
          method: 'POST',
          body: newAppointmentDto
        });
        
        if (createResult.error) {
          return { error: createResult.error };
        }
        
        return { 
          data: {
            oldAppointment: updateResult.data as ReadAgendamentoDto,
            newAppointment: createResult.data as ReadAgendamentoDto
          }
        };
      } catch (error) {
        return { 
          error: { 
            status: 500, 
            data: { message: 'Erro ao reagendar o agendamento' } 
          } 
        };
      }
    },
    invalidatesTags: ["Agendamento", "Paciente"],
  }),
  
  realizarCheckin: builder.mutation<
    { appointment: ReadAgendamentoDto, consulta: ReadConsultaDto },
    { 
      id: number; 
      updateDto: UpdateAgendamentoDto;
      createConsultaDto: CreateConsultaDto 
    }
  >({
    async queryFn({ id, updateDto, createConsultaDto }, _queryApi, _extraOptions, baseQuery) {
      try {
        // Step 1: Update appointment status to confirmed
        const updateResult = await baseQuery({
          url: `agendamento/${id}`,
          method: 'PUT',
          body: updateDto
        });
        
        if (updateResult.error) {
          return { error: updateResult.error };
        }
        
        // Step 2: Create an empty consultation
        const createResult = await baseQuery({
          url: 'consulta',
          method: 'POST',
          body: createConsultaDto
        });
        
        if (createResult.error) {
          return { error: createResult.error };
        }
        
        return { 
          data: {
            appointment: updateResult.data as ReadAgendamentoDto,
            consulta: createResult.data as ReadConsultaDto
          }
        };
      } catch (error) {
        return { 
          error: { 
            status: 500, 
            data: { message: 'Erro ao realizar check-in' } 
          } 
        };
      }
    },
    invalidatesTags: ["Agendamento", "Consulta", "Paciente"],
  }),
});
