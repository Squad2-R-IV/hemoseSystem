// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateUserDto } from '~/Dtos copy/User/CreateUser.dto';
import type { ReadUserDto } from '~/Dtos copy/User/ReadUser.dto';
import type { UpdateUserDto } from '~/Dtos copy/User/UpdateUser.dto';
import { CreateAgendamentoDto } from '~/Dtos copy/Agendamento/CreateAgendamentoDto';
import { ReadAgendamentoDto } from '~/Dtos copy/Agendamento/ReadAgendamentoDto';
import { UpdateAgendamentoDto } from '~/Dtos copy/Agendamento/UpdateAgendamentoDto';
import { CreateConsultaDto } from '~/Dtos copy/Consulta/CreateConsultaDto';
import { ReadConsultaDto } from '~/Dtos copy/Consulta/ReadConsultaDto';
import { UpdateConsultaDto } from '~/Dtos copy/Consulta/UpdateConsultaDto';

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const siahmeApi = createApi({
    reducerPath: 'siahmeApi',
    baseQuery,
    tagTypes: ['Agendamento', 'Consulta'],
    endpoints: (builder) => ({
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        /////////////////USER ENDPOINTS////////////////////////
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        login: builder.mutation<
            { token?: string; refreshToken?: string; message?: string },
            { email: string; password: string }>({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                    }
                } catch (error) {
                    const err = error as { error?: { status?: number } };
                    if (err.error && err.error.status === 404) {
                        console.error('Error: Usuário não encontrado');
                    }
                    else if (err.error && err.error.status === 401) {
                        console.error('Error: Senha inválida');
                    }
                    else if (err.error && err.error.status === 500) {
                        console.error('Error: Erro interno no servidor');
                    }
                    else {
                        console.error('Error storing token:', error);
                    }
                }
            },
        }),
        getUsers: builder.query<ReadUserDto[], void>({
            query: () => 'users',
        }),
        getUserById: builder.query<ReadUserDto, string>({
            query: (id) => `users/${id}`,
        }),
        createUser: builder.mutation<ReadUserDto, CreateUserDto>({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
        }),
        updateUser: builder.mutation<ReadUserDto, { id: string; body: UpdateUserDto }>({
            query: ({ id, body }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteUser: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
        refreshToken: builder.mutation<{ token: string; refreshToken: string }, void>({
            query: () => ({
                url: 'users/refreshToken',
                method: 'POST',
            }),
        }),
        logout: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: 'users/logout',
                method: 'POST',
            }),
        }),
        changeUserRoles: builder.mutation<{ success: boolean }, { userId: string; roles: string[] }>({
            query: (body) => ({
                url: 'users/changeUserRoles',
                method: 'POST',
                body,
            }),
        }),
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        /////////////////Agendamentos ENDPOINTS////////////////
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        getAgendamentos: builder.query<ReadAgendamentoDto[], { includeRelations?: boolean }>({
            query: ({ includeRelations = false }) => ({
                url: `agendamento?includeRelations=${includeRelations}`,
            }),
        }),
        getAgendamentoById: builder.query<ReadAgendamentoDto, { id: number; includeRelations?: boolean }>({
            query: ({ id, includeRelations = false }) => ({
                url: `agendamento/${id}?includeRelations=${includeRelations}`,
            }),
        }),
        createAgendamento: builder.mutation<ReadAgendamentoDto, CreateAgendamentoDto>({
            query: (body) => ({
                url: 'agendamento',
                method: 'POST',
                body,
            }),
        }),
        updateAgendamento: builder.mutation<ReadAgendamentoDto, { id: number; body: UpdateAgendamentoDto }>({
            query: ({ id, body }) => ({
                url: `agendamento/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteAgendamento: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `agendamento/${id}`,
                method: 'DELETE',
            }),
        }),
        getAgendamentosComConsultasAtivas: builder.query<ReadAgendamentoDto[], void>({
            query: () => 'agendamento/consultas-ativas',
            providesTags: ['Agendamento', 'Consulta'],
        }),
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        /////////////////Consultas ENDPOINTS///////////////////
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        getConsultas: builder.query<ReadConsultaDto[], { includeRelations?: boolean }>({
            query: ({ includeRelations = false }) => ({
                url: `consulta?includeRelations=${includeRelations}`,
            }),
        }),
        getConsultaById: builder.query<{ consulta: ReadConsultaDto; agendamento: ReadAgendamentoDto }, { id: number; includeRelations?: boolean }>({
            queryFn: async ({ id, includeRelations = false }, api, extraOptions, baseQuery) => {
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
                url: 'consulta',
                method: 'POST',
                body,
            }),
        }),
        updateConsulta: builder.mutation<ReadConsultaDto, { id: number; body: UpdateConsultaDto }>({
            query: ({ id, body }) => ({
                url: `consulta/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Consulta', 'Agendamento'],
        }),
        deleteConsulta: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `consulta/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

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
    useCreateAgendamentoMutation,
    useUpdateAgendamentoMutation,
    useDeleteAgendamentoMutation,
    useGetConsultasQuery,
    useGetConsultaByIdQuery,
    useCreateConsultaMutation,
    useUpdateConsultaMutation,
    useDeleteConsultaMutation,
} = siahmeApi;
