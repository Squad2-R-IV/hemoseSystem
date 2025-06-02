import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateUserToRoleDto } from "~/Dtos/UserToRole/CreateUserToRoleDto";
import { ReadUserToRoleDto } from "~/Dtos/UserToRole/ReadUserToRoleDto";
import { UpdateUserToRoleDto } from "~/Dtos/UserToRole/UpdateUserToRoleDto";

export const userToRoleEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getUserToRoles: builder.query<
    ReadUserToRoleDto[],
    { includeRelations?: boolean }
  >({
    query: ({ includeRelations = false }) => ({
      url: `user-to-role?includeRelations=${includeRelations}`,
    }),
    providesTags: ["UserToRole"],
  }),
  
  getUserToRoleById: builder.query<
    ReadUserToRoleDto,
    { userId: string; roleId: string; includeRelations?: boolean }
  >({
    query: ({ userId, roleId, includeRelations = false }) => ({
      url: `user-to-role/${userId}/${roleId}?includeRelations=${includeRelations}`,
    }),
    providesTags: ["UserToRole"],
  }),
  
  createUserToRole: builder.mutation<ReadUserToRoleDto, CreateUserToRoleDto>({
    query: (body) => ({
      url: "user-to-role",
      method: "POST",
      body,
    }),
    invalidatesTags: ["UserToRole", "User", "Role"],
  }),
  
  updateUserToRole: builder.mutation<
    ReadUserToRoleDto,
    { userId: string; roleId: string; body: UpdateUserToRoleDto }
  >({
    query: ({ userId, roleId, body }) => ({
      url: `user-to-role/${userId}/${roleId}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["UserToRole", "User", "Role"],
  }),
  
  deleteUserToRole: builder.mutation<{ success: boolean }, { userId: string; roleId: string }>({
    query: ({ userId, roleId }) => ({
      url: `user-to-role/${userId}/${roleId}`,
      method: "DELETE",
    }),
    invalidatesTags: ["UserToRole", "User", "Role"],
  }),
});
