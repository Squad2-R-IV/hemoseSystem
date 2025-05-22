// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUserDto } from "~/Dtos/User/CreateUser.dto";
import type { ReadUserDto } from "~/Dtos/User/ReadUser.dto";
import type { UpdateUserDto } from "~/Dtos/User/UpdateUser.dto";
import { CreateAgendamentoDto } from "~/Dtos/Agendamento/CreateAgendamentoDto";
import { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import { UpdateAgendamentoDto } from "~/Dtos/Agendamento/UpdateAgendamentoDto";
import { CreateConsultaDto } from "~/Dtos/Consulta/CreateConsultaDto";
import { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";
import { UpdateConsultaDto } from "~/Dtos/Consulta/UpdateConsultaDto";
import { CreateAnamneseDto } from "~/Dtos/Anamnese/CreateAnamneseDto";
import { ReadAnamneseDto } from "~/Dtos/Anamnese/ReadAnamneseDto";
import { UpdateAnamneseDto } from "~/Dtos/Anamnese/UpdateAnamneseDto";
import { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";
import { UpdateCondutaDto } from "~/Dtos/Conduta/UpdateCondutaDto";
import { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";
import { UpdateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/UpdateEvolucaoMedicaDto";
import { CreatePrescricaoDto } from "~/Dtos/Prescricao/CreatePrescricaoDto";
import { ReadPrescricaoDto } from "~/Dtos/Prescricao/ReadPrescricaoDto";
import { UpdatePrescricaoDto } from "~/Dtos/Prescricao/UpdatePrescricaoDto";
import { CreatePacienteDto } from "~/Dtos/Paciente/CreatePacienteDto";
import { ReadPacienteDto } from "~/Dtos/Paciente/ReadPacienteDto";
import { showApiError } from "~/utils/handlers/api-error-handler";
import { addToast } from "@heroui/react";
import type { UpdatePacienteDto } from "~/Dtos/Paciente/UpdatePacienteDto";

// Define a service using a base URL and expected endpoints
const env = import.meta.env
const baseQuery = fetchBaseQuery({
  baseUrl: env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Criar um wrapper para o baseQuery que intercepta erros
const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  
  // Se houver um erro na requisição, exibe o toast automaticamente
  if (result.error) {
    // Não mostrar erros automáticos para o endpoint de login
    if (!args.url.endsWith('/login')) {
      showApiError(result.error);
    }
  }
  
  return result;
};

export const siahmeApi = createApi({
  reducerPath: "siahmeApi",
  baseQuery: baseQueryWithErrorHandling, // Usando o query modificado com tratamento de erro
  tagTypes: ["Agendamento", "Consulta", "Anamnese", "Conduta", "Prescricao"],
  endpoints: (builder) => ({


    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////USER ENDPOINTS////////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    login: builder.mutation<
      { token?: string; refreshToken?: string; message?: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (error: any) {
          // Tratamento específico para erros de login
          const err = error as { error?: { status?: number; data?: any } };
          
          if (err.error) {
            let message = "Falha na autenticação";
            
            if (err.error.status === 404) {
              message = "Usuário não encontrado";
            } else if (err.error.status === 401) {
              message = "Senha inválida";
            } else if (err.error.status === 500) {
              message = "Erro interno no servidor";
            } else if (err.error.data?.message) {
              message = err.error.data.message;
            }
            
            addToast({
              title: "Erro de Login",
              description: message,
              color: "danger",
            });
          }
        }
      },
    }),
    getUsers: builder.query<ReadUserDto[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<ReadUserDto, string>({
      query: (id) => `users/${id}`,
    }),
    createUser: builder.mutation<ReadUserDto, CreateUserDto>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<
      ReadUserDto,
      { id: string; body: UpdateUserDto }
    >({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    refreshToken: builder.mutation<
      { token: string; refreshToken: string },
      void
    >({
      query: () => ({
        url: "users/refreshToken",
        method: "POST",
      }),
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    changeUserRoles: builder.mutation<
      { success: boolean },
      { userId: string; roles: string[] }
    >({
      query: (body) => ({
        url: "users/changeUserRoles",
        method: "POST",
        body,
      }),
    }),
    getMedicos: builder.query<ReadUserDto[], void>({
      query: () => "users/medicos",
    }),
    getGestores: builder.query<ReadUserDto[], void>({
      query: () => "users/gestores",
    }),
    getEnfermeiros: builder.query<ReadUserDto[], void>({
      query: () => "users/enfermeiros",
    }),
    getRecepcionistas: builder.query<ReadUserDto[], void>({
      query: () => "users/recepcionistas",
    }),
    getDentistas: builder.query<ReadUserDto[], void>({
      query: () => "users/dentistas",
    }),
    getFisioterapeutas: builder.query<ReadUserDto[], void>({
      query: () => "users/fisioterapeutas",
    }),
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////Agendamentos ENDPOINTS////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    getAgendamentos: builder.query<
      ReadAgendamentoDto[],
      { includeRelations?: boolean }
    >({
      query: ({ includeRelations = false }) => ({
        url: `agendamento?includeRelations=${includeRelations}`,
      }),
    }),
    getAgendamentoById: builder.query<
      ReadAgendamentoDto,
      { id: number; includeRelations?: boolean }
    >({
      query: ({ id, includeRelations = false }) => ({
        url: `agendamento/${id}?includeRelations=${includeRelations}`,
      }),
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
    }),
    deleteAgendamento: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `agendamento/${id}`,
        method: "DELETE",
      }),
    }),
    getAgendamentosComConsultasAtivas: builder.query<
      ReadAgendamentoDto[],
      void
    >({
      query: () => "agendamento/consultas-ativas",
      providesTags: ["Agendamento", "Consulta"],
    }),
    getAgendamentosByDate: builder.query<
      ReadAgendamentoDto[],
      { date: string }
    >({
      query: ({ date }) => `agendamento/data/${date}`,
      providesTags: ["Agendamento"],
    }),
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////Consultas ENDPOINTS///////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    getConsultas: builder.query<
      ReadConsultaDto[],
      { includeRelations?: boolean }
    >({
      query: ({ includeRelations = false }) => ({
        url: `consulta?includeRelations=${includeRelations}`,
      }),
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
    }),
    createConsulta: builder.mutation<ReadConsultaDto, CreateConsultaDto>({
      query: (body) => ({
        url: "consulta",
        method: "POST",
        body,
      }),
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
    }),    fetchAllConsultaDetails: builder.query<
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
    }),
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////Anamnese ENDPOINTS////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    getAnamneses: builder.query<
      ReadAnamneseDto[],
      { includeRelations?: boolean }
    >({
      query: ({ includeRelations = false }) => ({
        url: `anamnese?includeRelations=${includeRelations}`,
      }),
    }),
    getAnamneseById: builder.query<
      ReadAnamneseDto,
      { id: number; includeRelations?: boolean }
    >({
      query: ({ id, includeRelations = false }) => ({
        url: `anamnese/${id}?includeRelations=${includeRelations}`,
      }),
    }),
    createAnamnese: builder.mutation<ReadAnamneseDto, CreateAnamneseDto>({
      query: (body) => ({
        url: "anamnese",
        method: "POST",
        body,
      }),
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
    }),
    deleteAnamnese: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `anamnese/${id}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////Conduta ENDPOINTS/////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    getCondutas: builder.query<
      ReadCondutaDto[],
      { includeRelations?: boolean }
    >({
      query: ({ includeRelations = false }) => ({
        url: `conduta?includeRelations=${includeRelations}`,
      }),
    }),
    getCondutaById: builder.query<
      ReadCondutaDto,
      { id: number; includeRelations?: boolean }
    >({
      query: ({ id, includeRelations = false }) => ({
        url: `conduta/${id}?includeRelations=${includeRelations}`,
      }),
    }),
    createConduta: builder.mutation<ReadCondutaDto, CreateCondutaDto>({
      query: (body) => ({
        url: "conduta",
        method: "POST",
        body,
      }),
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
    }),
    deleteConduta: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `conduta/${id}`,
        method: "DELETE",
      }),
    }),    getCondutasByConsultaId: builder.query<
      ReadCondutaDto[],
      { consultaId: number }
    >({
      query: ({ consultaId }) => ({
        url: `conduta/consulta?consultaId=${consultaId}`,
      }),
    }),
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////EvolucaoMedica ENDPOINTS//////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    getEvolucoesMedicas: builder.query<
      ReadEvolucaoMedicaDto[],
      { includeRelations?: boolean }
    >({
      query: ({ includeRelations = false }) => ({
        url: `evolucao-medica?includeRelations=${includeRelations}`,
      }),
    }),
    getEvolucaoMedicaById: builder.query<
      ReadEvolucaoMedicaDto,
      { id: number; includeRelations?: boolean }
    >({
      query: ({ id, includeRelations = false }) => ({
        url: `evolucao-medica/${id}?includeRelations=${includeRelations}`,
      }),
    }),
    createEvolucaoMedica: builder.mutation<ReadEvolucaoMedicaDto, CreateEvolucaoMedicaDto>({
      query: (body) => ({
        url: "evolucao-medica",
        method: "POST",
        body,
      }),
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
    }),
    deleteEvolucaoMedica: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `evolucao-medica/${id}`,
        method: "DELETE",
      }),
    }),
    getEvolucoesMedicasByConsultaId: builder.query<
      ReadEvolucaoMedicaDto[],
      { consultaId: number }
    >({
      query: ({ consultaId }) => ({
        url: `evolucao-medica/consulta?consultaId=${consultaId}`,
      }),
    }),
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////Paciente ENDPOINTS/////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    getPacientes: builder.query<ReadPacienteDto[], { includeRelations?: boolean }>({
      query: ({ includeRelations = false }) => ({
        url: `paciente?includeRelations=${includeRelations}`,
      }),
    }),
    getPacienteById: builder.query<ReadPacienteDto, { id: number; includeRelations?: boolean }>({
      query: ({ id, includeRelations = false }) => ({
        url: `paciente/${id}?includeRelations=${includeRelations}`,
      }),
    }),
    createPaciente: builder.mutation<ReadPacienteDto, CreatePacienteDto>({
      query: (body) => ({
        url: "paciente",
        method: "POST",
        body,
      }),
    }),
    updatePaciente: builder.mutation<ReadPacienteDto, { id: number; body: UpdatePacienteDto }>({
      query: ({ id, body }) => ({
        url: `paciente/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePaciente: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `paciente/${id}`,
        method: "DELETE",
      }),
    }),
    getPacienteByCpf: builder.query<ReadPacienteDto, { cpf: string }>({
      query: ({ cpf }) => ({
        url: `paciente/cpf/${cpf}`,
      }),
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
      invalidatesTags: ["Agendamento"],
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
      invalidatesTags: ["Agendamento", "Consulta"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useChangeUserRolesMutation,
  useGetAgendamentosQuery,
  useGetAgendamentoByIdQuery,
  useGetAgendamentosComConsultasAtivasQuery,
  useGetAgendamentosByDateQuery,
  useCreateAgendamentoMutation,
  useUpdateAgendamentoMutation,
  useDeleteAgendamentoMutation,
  useGetConsultasQuery,
  useGetConsultaByIdQuery,
  useCreateConsultaMutation,
  useUpdateConsultaMutation,
  useDeleteConsultaMutation,
  useGetAnamnesesQuery,
  useGetAnamneseByIdQuery,
  useCreateAnamneseMutation,
  useUpdateAnamneseMutation,
  useDeleteAnamneseMutation,
  useGetCondutasQuery,
  useGetCondutaByIdQuery,
  useCreateCondutaMutation,
  useUpdateCondutaMutation,  useDeleteCondutaMutation,
  useGetCondutasByConsultaIdQuery,
  useFetchAllConsultaDetailsQuery,
  useGetEvolucoesMedicasQuery,
  useGetEvolucaoMedicaByIdQuery,
  useCreateEvolucaoMedicaMutation,
  useUpdateEvolucaoMedicaMutation,
  useDeleteEvolucaoMedicaMutation,
  useGetEvolucoesMedicasByConsultaIdQuery,
  useGetPacientesQuery,
  useGetPacienteByIdQuery,
  useCreatePacienteMutation,
  useUpdatePacienteMutation,
  useDeletePacienteMutation,
  useGetPacienteByCpfQuery, // Add this hook for the new endpoint
  useGetMedicosQuery,
  useGetEnfermeirosQuery,
  useGetRecepcionistasQuery, 
  useGetDentistasQuery,
  useGetFisioterapeutasQuery,
  useReagendarAgendamentoMutation, // Add this export
  useRealizarCheckinMutation,
  useGetGestoresQuery,
} = siahmeApi;
