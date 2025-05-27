import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateArquivoExameDto } from "~/Dtos/ArquivoExame/CreateArquivoExameDto";
import { ReadArquivoExameDto } from "~/Dtos/ArquivoExame/ReadArquivoExameDto";
import type { UpdateArquivoExameDto } from "~/Dtos/ArquivoExame/UpdateArquivoExameDto";

export const arquivoExameEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getArquivosExame: builder.query<ReadArquivoExameDto[], { includeRelations?: boolean }>({
    query: ({ includeRelations = false } = {}) => ({
      url: `arquivo-exame${includeRelations ? '?includeRelations=true' : ''}`,
    }),
    providesTags: ["ArquivoExame"],
  }),
  
  getArquivoExameById: builder.query<ReadArquivoExameDto, { id: number; includeRelations?: boolean }>({
    query: ({ id, includeRelations = false }) => ({
      url: `arquivo-exame/${id}${includeRelations ? '?includeRelations=true' : ''}`,
    }),
    providesTags: ["ArquivoExame"],
  }),
  
  createArquivoExame: builder.mutation<ReadArquivoExameDto, CreateArquivoExameDto>({
    query: (body) => ({
      url: "arquivo-exame",
      method: "POST",
      body,
    }),
    invalidatesTags: ["ArquivoExame"],
  }),
  
  updateArquivoExame: builder.mutation<ReadArquivoExameDto, { id: number; body: UpdateArquivoExameDto }>({
    query: ({ id, body }) => ({
      url: `arquivo-exame/${id}`,
      method: "PUT",
      body,
    }),
    invalidatesTags: ["ArquivoExame"],
  }),
  
  deleteArquivoExame: builder.mutation<{ success: boolean }, number>({
    query: (id) => ({
      url: `arquivo-exame/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["ArquivoExame"],
  }),
  
  // Upload endpoints for file handling
  uploadArquivo: builder.mutation<ReadArquivoExameDto, { file: File; id_exame: number }>({
    query: ({ file, id_exame }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id_exame', id_exame.toString());
      
      return {
        url: "arquivo-exame/upload",
        method: "POST",
        body: formData,
      };
    },
    invalidatesTags: ["ArquivoExame"],
  }),

  uploadMultiplosArquivos: builder.mutation<
    { arquivos_salvos: ReadArquivoExameDto[]; erros: any[]; total_enviados: number; total_salvos: number },
    { files: File[]; id_exame: number }
  >({
    query: ({ files, id_exame }) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('id_exame', id_exame.toString());
      
      return {
        url: "arquivo-exame/upload-multiplos",
        method: "POST",
        body: formData,
      };
    },
    invalidatesTags: ["ArquivoExame"],
  }),  // Download endpoint
  downloadArquivo: builder.query<Blob, number>({
    query: (id) => ({
      url: `arquivo-exame/download/${id}`,
      responseHandler: async (response: Response) => {
        return response.blob();
      },
    }),
    // Use a unique tag for each file to prevent cache conflicts
    providesTags: (result, error, id) => [{ type: "ArquivoExame", id: `download-${id}` }],
    // Ensure fresh data on each request
    keepUnusedDataFor: 0,
  }),

  // Get files by exam ID
  getArquivosByExameId: builder.query<ReadArquivoExameDto[], number>({
    query: (exameId) => `arquivo-exame/exame/${exameId}`,
    providesTags: ["ArquivoExame"],
  }),

  // Get files by type
  getArquivosByTipo: builder.query<ReadArquivoExameDto[], string>({
    query: (tipoArquivo) => `arquivo-exame/tipo/${encodeURIComponent(tipoArquivo)}`,
    providesTags: ["ArquivoExame"],
  }),
});
