import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showApiError } from "~/utils/handlers/api-error-handler";

// Define a service using a base URL and expected endpoints
const env = import.meta.env;

export const baseQuery = fetchBaseQuery({
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
export const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
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

export const API_TAGS = [
  "User",
  "Agendamento", 
  "Consulta", 
  "Anamnese", 
  "Conduta", 
  "EvolucaoMedica",
  "AltaMedica",
  "Prescricao",
  "Paciente",
  "Exame",
  "ArquivoExame"
] as const;
