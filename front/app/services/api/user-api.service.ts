import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateUserDto } from "~/Dtos/User/CreateUser.dto";
import type { ReadUserDto } from "~/Dtos/User/ReadUser.dto";
import type { UpdateUserDto } from "~/Dtos/User/UpdateUser.dto";
import { addToast } from "@heroui/react";

export const userEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
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
    invalidatesTags: ["User"],
  }),
  
  getUsers: builder.query<ReadUserDto[], void>({
    query: () => "users",
    providesTags: ["User"],
  }),
  
  getUserById: builder.query<ReadUserDto, string>({
    query: (id) => `users/${id}`,
    providesTags: ["User"],
  }),
  
  createUser: builder.mutation<ReadUserDto, CreateUserDto>({
    query: (body) => ({
      url: "users",
      method: "POST",
      body,
    }),
    invalidatesTags: ["User"],
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
    invalidatesTags: ["User"],
  }),
  
  deleteUser: builder.mutation<{ success: boolean }, string>({
    query: (id) => ({
      url: `users/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["User"],
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
    invalidatesTags: ["User"],
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
    invalidatesTags: ["User"],
  }),
  
  getMedicos: builder.query<ReadUserDto[], void>({
    query: () => "users/medicos",
    providesTags: ["User"],
  }),
  
  getGestores: builder.query<ReadUserDto[], void>({
    query: () => "users/gestores",
    providesTags: ["User"],
  }),
  
  getEnfermeiros: builder.query<ReadUserDto[], void>({
    query: () => "users/enfermeiros",
    providesTags: ["User"],
  }),
  
  getRecepcionistas: builder.query<ReadUserDto[], void>({
    query: () => "users/recepcionistas",
    providesTags: ["User"],
  }),
  
  getDentistas: builder.query<ReadUserDto[], void>({
    query: () => "users/dentistas",
    providesTags: ["User"],
  }),
  
  getFisioterapeutas: builder.query<ReadUserDto[], void>({
    query: () => "users/fisioterapeutas",
    providesTags: ["User"],
  }),
});
