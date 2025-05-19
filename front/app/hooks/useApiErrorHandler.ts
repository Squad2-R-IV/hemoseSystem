import { useCallback } from 'react';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { showApiError, showCustomApiError, getErrorMessage } from '~/utils/handlers/api-error-handler';
import { addToast } from '@heroui/react';

/**
 * Hook para tratamento personalizado de erros de API
 */
export function useApiErrorHandler() {
  /**
   * Exibe um erro da API com um título padrão
   */
  const handleApiError = useCallback((error: FetchBaseQueryError | SerializedError) => {
    showApiError(error);
  }, []);

  /**
   * Exibe um erro da API com um título personalizado
   */
  const handleApiErrorWithTitle = useCallback((
    error: FetchBaseQueryError | SerializedError, 
    title: string
  ) => {
    showCustomApiError(error, title);
  }, []);

  /**
   * Exibe uma mensagem de erro totalmente personalizada
   */
  const handleCustomError = useCallback((
    error: FetchBaseQueryError | SerializedError | any,
    title: string,
    customMessage?: string
  ) => {
    const message = customMessage || getErrorMessage(error);
    
    addToast({
      title,
      description: message,
      color: "danger",
    });
  }, []);

  /**
   * Exibe uma mensagem de sucesso
   */
  const showSuccess = useCallback((message: string, title = "Sucesso") => {
    addToast({
      title,
      description: message,
      color: "success",
    });
  }, []);

  /**
   * Exibe uma mensagem de aviso
   */
  const showWarning = useCallback((message: string, title = "Atenção") => {
    addToast({
      title,
      description: message,
      color: "warning",
    });
  }, []);

  /**
   * Exibe uma mensagem informativa
   */
  const showInfo = useCallback((message: string, title = "Informação") => {
    addToast({
      title,
      description: message,
      color: "primary",
    });
  }, []);

  return {
    handleApiError,
    handleApiErrorWithTitle,
    handleCustomError,
    showSuccess,
    showWarning,
    showInfo
  };
}