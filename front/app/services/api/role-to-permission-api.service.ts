import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateRoleToPermissionDto } from "~/Dtos/RoleToPermission/CreateRoleToPermissionDto";
import { ReadRoleToPermissionDto } from "~/Dtos/RoleToPermission/ReadRoleToPermissionDto";
import { UpdateRoleToPermissionDto } from "~/Dtos/RoleToPermission/UpdateRoleToPermissionDto";

export const roleToPermissionEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getRoleToPermissions: builder.query<
    ReadRoleToPermissionDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `role-to-permission?includeRelations=${includeRelations}`,
    }),
    providesTags: ["RoleToPermission"],
  }),
  
  getRoleToPermissionById: builder.query<
    ReadRoleToPermissionDto,
    { roleId: string; permissionId: string; includeRelations?: boolean }
  >({
    query: ({ roleId, permissionId, includeRelations = false }) => ({
      url: `role-to-permission/${roleId}/${permissionId}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["RoleToPermission"],
  }),
  
  createRoleToPermission: builder.mutation<ReadRoleToPermissionDto, CreateRoleToPermissionDto>({
    query: (body) => ({
      url: "role-to-permission",
      method: "POST",
      body,
    }),
    invalidatesTags: ["RoleToPermission", "Role", "Permission"],
  }),
  
  updateRoleToPermission: builder.mutation<
    ReadRoleToPermissionDto,
    { roleId: string; permissionId: string; body: UpdateRoleToPermissionDto }
  >({
    query: ({ roleId, permissionId, body }) => ({
      url: `role-to-permission/${roleId}/${permissionId}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["RoleToPermission", "Role", "Permission"],
  }),
  
  deleteRoleToPermission: builder.mutation<{ success: boolean }, { roleId: string; permissionId: string }>({
    query: ({ roleId, permissionId }) => ({
      url: `role-to-permission/${roleId}/${permissionId}`,
      method: "DELETE",
    }),
    invalidatesTags: ["RoleToPermission", "Role", "Permission"],
  }),
});
