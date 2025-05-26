import { useState } from "react";
import { addToast } from "@heroui/react";
import { 
  useCreateExameMutation, 
  useUploadArquivoMutation,
  useUploadMultiplosArquivosMutation 
} from "~/services/api";
import type { CreateExameDto } from "~/Dtos/Exame/CreateExameDto";

interface UseCreateExameWithFilesParams {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreateExameWithFiles = ({ onSuccess, onError }: UseCreateExameWithFilesParams = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createExame] = useCreateExameMutation();
  const [uploadArquivo] = useUploadArquivoMutation();
  const [uploadMultiplosArquivos] = useUploadMultiplosArquivosMutation();
  const createExameWithFiles = async (
    exameData: CreateExameDto, 
    files?: FileList | File[] | null
  ) => {
    setIsLoading(true);
    
    try {
      // Step 1: Create the exam
      addToast({
        title: "Criando exame...",
        description: "Processando dados do exame",
        color: "primary"
      });

      const createdExame = await createExame(exameData).unwrap();
      
      addToast({
        title: "Exame criado com sucesso!",
        description: `Exame ID: ${createdExame.id}`,
        color: "success"
      });

      // Step 2: Upload files if any
      if (files && files.length > 0) {
        addToast({
          title: "Processando arquivos...",
          description: `Fazendo upload de ${files.length} arquivo(s)`,
          color: "primary"
        });

        const filesArray = Array.from(files);
        
        if (filesArray.length === 1) {
          // Use single upload endpoint for single file
          await uploadArquivo({
            file: filesArray[0],
            id_exame: createdExame.id
          }).unwrap();
        } else {
          // Use multiple upload endpoint for multiple files
          const result = await uploadMultiplosArquivos({
            files: filesArray,
            id_exame: createdExame.id
          }).unwrap();

          // Check if there were any errors during upload
          if (result.erros && result.erros.length > 0) {
            addToast({
              title: "Alguns arquivos falharam",
              description: `${result.total_salvos}/${result.total_enviados} arquivos foram salvos com sucesso`,
              color: "warning"
            });
          }
        }

        addToast({
          title: "Arquivos enviados com sucesso!",
          description: `${files.length} arquivo(s) foram associados ao exame`,
          color: "success"
        });
      }

      // Success callback
      onSuccess?.();
      
      return createdExame;

    } catch (error: any) {
      console.error("Error creating exam with files:", error);
      
      let errorMessage = "Erro desconhecido";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      addToast({
        title: "Erro ao criar exame",
        description: errorMessage,
        color: "danger"
      });

      // Error callback
      onError?.(error);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createExameWithFiles,
    isLoading,
  };
};
