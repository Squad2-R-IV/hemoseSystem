// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateUserDto } from '~/Dtos copy/User/CreateUser.dto';
import type { ReadUserDto } from '~/Dtos copy/User/ReadUser.dto';
import type { UpdateUserDto } from '~/Dtos copy/User/UpdateUser.dto';

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
    endpoints: (builder) => ({
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
} = siahmeApi;