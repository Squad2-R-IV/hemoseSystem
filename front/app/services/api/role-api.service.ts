import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateRoleDto } from "~/Dtos/Role/CreateRoleDto";
import { ReadRoleDto } from "~/Dtos/Role/ReadRoleDto";
import { UpdateRoleDto } from "~/Dtos/Role/UpdateRoleDto";

export const roleEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getRoles: builder.query<
    ReadRoleDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `role?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Role"],
  }),
  
  getRoleById: builder.query<
    ReadRoleDto,
    { id: string; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `role/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Role"],
  }),
  
  createRole: builder.mutation<ReadRoleDto, CreateRoleDto>({
    query: (body) => ({
      url: "role",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Role"],
  }),
  
  updateRole: builder.mutation<
    ReadRoleDto,
    { id: string; body: UpdateRoleDto }
  >({
    query: ({ id, body }) => ({
      url: `role/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Role"],
  }),
  
  deleteRole: builder.mutation<{ success: boolean }, string>({
    query: (id) => ({
      url: `role/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Role"],
  }),
});
