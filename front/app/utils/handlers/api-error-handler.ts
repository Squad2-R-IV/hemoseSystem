import { addToast } from "@heroui/react";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Interface para os erros específicos da nossa API
interface ApiErrorResponse {
  titulo?: string;
  mensagem?: string;
  message?: string;
  error?: string;
  statusCode?: number;
}

// Extrai mensagem de erro da resposta da API
export const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  // Caso seja um erro do FetchBaseQuery
  if ('status' in error) {
    // Tenta extrair um corpo de resposta estruturado
    const responseData = error.data as ApiErrorResponse | undefined;
    
    // Se a API retornou uma mensagem estruturada
    if (responseData) {
      if (responseData.mensagem) return responseData.mensagem;
      if (responseData.message) return responseData.message;
      if (responseData.titulo) return responseData.titulo;
      if (responseData.error) return responseData.error;
    }
    
    // Mensagens padrão baseadas no status HTTP
    switch (error.status) {
      case 400: return 'Solicitação inválida. Verifique os dados enviados.';
      case 401: return 'Não autorizado. Por favor, faça login novamente.';
      case 403: return 'Acesso negado. Você não tem permissão para esta ação.';
      case 404: return 'Recurso não encontrado.';
      case 409: return 'Conflito nos dados. Este registro pode já existir.';
      case 422: return 'Dados inválidos. Verifique as informações enviadas.';
      case 500: return 'Erro no servidor. Tente novamente mais tarde.';
      default: return `Erro ${error.status}: Ocorreu um problema na requisição.`;
    }
  }
  
  // Caso seja um erro serializado do RTK
  if ('message' in error && error.message) {
    return error.message;
  }
  
  // Mensagem genérica se não conseguirmos extrair nada específico
  return 'Ocorreu um erro desconhecido. Tente novamente mais tarde.';
};

// Função para mostrar erros da API como toasts
export const showApiError = (error: FetchBaseQueryError | SerializedError): void => {
  const message = getErrorMessage(error);
  const title = 'status' in error && error.status === 401 ? 'Erro de Autenticação' : 'Erro';
  
  addToast({
    title,
    description: message,
    color: "danger",
  });
};

// Função para personalizar o título do toast
export const showCustomApiError = (
  error: FetchBaseQueryError | SerializedError,
  customTitle: string
): void => {
  const message = getErrorMessage(error);
  
  addToast({
    title: customTitle,
    description: message,
    color: "danger",
  });
};