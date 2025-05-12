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
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";

interface CancelModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  appointment: ReadAgendamentoDto | null;
  onConfirm: () => Promise<boolean | undefined>;
  isLoading: boolean;
}

export function CancelModal({
  isOpen,
  onOpenChange,
  onClose,
  appointment,
  onConfirm,
  isLoading,
}: CancelModalProps) {
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
        <ModalHeader>Cancelar Agendamento</ModalHeader>
        <ModalBody>
          {appointment && (
            <div>
              <p className="text-center mb-4">
                Deseja realmente cancelar o agendamento do Paciente:
                <strong> {appointment.Paciente?.nome_paciente}</strong>,
                portador de CPF: <strong>{appointment.Paciente?.cpf}</strong>?
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
            {isLoading ? <Spinner size="sm" /> : "Confirmar Cancelamento"}
          </Button>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
