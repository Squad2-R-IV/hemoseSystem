import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Spinner,
  Button,
} from "@heroui/react";
import {
  DocumentTextIcon,
  ListBulletIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { ExamsTable } from "~/components/paciente/ExamsTable";
import { siahmeApi } from "~/services/siahme-api.service";
import type { ReadExameDto } from "~/Dtos/Exame/ReadExameDto";

interface ExamesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  pacienteId: number;
  onCreateExame: () => void;
  pacienteNome?: string;
  pacienteCpf?: string;
}

export default function ExamesListModal({
  isOpen,
  onClose,
  pacienteId,
  onCreateExame,
  pacienteNome,
  pacienteCpf,
}: ExamesListModalProps) {
  const [examesData, setExamesData] = useState<ReadExameDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create a lazy query function to fetch exams
  const [trigger, { isFetching }] = siahmeApi.endpoints.getExamesByPaciente.useLazyQuery();

  const fetchExames = async () => {
    if (!pacienteId) return;

    setIsLoading(true);
    try {
      const result = await trigger(pacienteId);
      if (result.data) {
        setExamesData(result.data);
      } else if (result.error) {
        console.error("Error in API response:", result.error);
        setExamesData([]);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExamesData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && pacienteId) {
      fetchExames();
    }
  }, [isOpen, pacienteId]);

  const handleCreateExame = () => {
    onClose();
    onCreateExame();
  };

  const isLoadingState = (isLoading || isFetching) && examesData.length === 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      className="max-w-5xl mx-auto"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 bg-blue-50 border-b">
          <div className="flex items-center justify-center gap-2">
            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold font-serif text-center">
              Exames do Paciente
            </h2>
          </div>
          {(pacienteNome || pacienteCpf) && (
            <p className="text-sm text-gray-500 text-center mt-1">
              {pacienteNome || "Paciente"} - {pacienteCpf || ""}
            </p>
          )}
        </ModalHeader>

        <div className="p-6 bg-gray-50">
          {isLoadingState ? (
            <div className="flex flex-col justify-center items-center p-12">
              <Spinner size="lg" color="primary" />
              <p className="mt-3 text-gray-600">Carregando exames...</p>
            </div>
          ) : examesData.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <ListBulletIcon className="h-16 w-16 text-gray-300" />
              <p className="text-lg text-gray-500 mt-4">
                Nenhum exame encontrado para este paciente
              </p>
              <Button
                className="mt-4"
                color="primary"
                startContent={<PlusCircleIcon className="h-5 w-5" />}
                onPress={handleCreateExame}
              >
                Criar Novo Exame
              </Button>
            </div>
          ) : (
            <ExamsTable isLoading={false} exames={examesData} />
          )}
        </div>
      </ModalContent>
    </Modal>
  );
}
