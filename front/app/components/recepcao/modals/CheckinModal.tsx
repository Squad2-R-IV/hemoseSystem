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

interface CheckinModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  appointment: ReadAgendamentoDto | null;
  onConfirm: () => Promise<boolean | undefined>;
  isLoading: boolean;
}

export function CheckinModal({
  isOpen,
  onOpenChange,
  onClose,
  appointment,
  onConfirm,
  isLoading,
}: CheckinModalProps) {
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
        <ModalHeader>Confirmar Check-in</ModalHeader>
        <ModalBody>
          {appointment && (
            <div>
              <p className="text-center mb-4">
                Deseja realmente fazer o check-in do Paciente:
                <strong> {appointment.Paciente?.nome_paciente}</strong>,
                portador de CPF: <strong>{appointment.Paciente?.cpf}</strong>?
              </p>
              <p className="text-center mt-2">
                Horário atual:{" "}
                <strong>{new Date().toLocaleTimeString()}</strong>
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={handleConfirm}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Confirmar Check-in"}
          </Button>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
