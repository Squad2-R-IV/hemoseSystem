// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const siahmeApi = createApi({
    reducerPath: 'siahmeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        login: builder.mutation<
            { token?: string; refreshToken?: string; message?: string },
            { email: string; password: string }>({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body,
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = siahmeApi