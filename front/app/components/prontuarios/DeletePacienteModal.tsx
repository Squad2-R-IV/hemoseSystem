import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import type { ReadPacienteDto } from "~/Dtos/Paciente/ReadPacienteDto";

interface DeletePacienteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  paciente: ReadPacienteDto | null;
  onConfirm: () => Promise<boolean | undefined>;
  isLoading: boolean;
}

export function DeletePacienteModal({
  isOpen,
  onOpenChange,
  onClose,
  paciente,
  onConfirm,
  isLoading,
}: DeletePacienteModalProps) {
  // Handle the confirmation with proper loading state
  const handleConfirm = async () => {
    const success = await onConfirm();
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Excluir Paciente</ModalHeader>
        <ModalBody>
          {paciente && (
            <div>
              <p className="text-center mb-4">
                Deseja realmente excluir o paciente:
                <strong> {paciente.nome_paciente}</strong>,
                portador de CPF: <strong>{paciente.cpf}</strong>?
              </p>
              <p className="text-center text-danger">
                Esta ação não poderá ser desfeita.
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onPress={handleConfirm}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Confirmar Exclusão"}
          </Button>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}