import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreatePermissionDto } from "~/Dtos/Permission/CreatePermissionDto";
import { ReadPermissionDto } from "~/Dtos/Permission/ReadPermissionDto";
import { UpdatePermissionDto } from "~/Dtos/Permission/UpdatePermissionDto";

export const permissionEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getPermissions: builder.query<
    ReadPermissionDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `permission?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Permission"],
  }),
  
  getPermissionById: builder.query<
    ReadPermissionDto,
    { id: string; includeRelations?: boolean }
  >({
    query: ({ id, includeRelations = false }) => ({
      url: `permission/${id}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["Permission"],
  }),
  
  createPermission: builder.mutation<ReadPermissionDto, CreatePermissionDto>({
    query: (body) => ({
      url: "permission",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Permission"],
  }),
  
  updatePermission: builder.mutation<
    ReadPermissionDto,
    { id: string; body: UpdatePermissionDto }
  >({
    query: ({ id, body }) => ({
      url: `permission/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["Permission"],
  }),
  
  deletePermission: builder.mutation<{ success: boolean }, string>({
    query: (id) => ({
      url: `permission/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Permission"],
  }),
});
