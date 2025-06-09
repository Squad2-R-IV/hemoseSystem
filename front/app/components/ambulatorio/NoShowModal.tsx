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

interface NoShowModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  agendamento: ReadAgendamentoDto | null;
  onConfirm: () => Promise<boolean | undefined>;
  isLoading: boolean;
}

export function NoShowModal({
  isOpen,
  onOpenChange,
  onClose,
  agendamento,
  onConfirm,
  isLoading,
}: NoShowModalProps) {
  const handleConfirm = async () => {
    const success = await onConfirm();
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Marcar Ausência</ModalHeader>
        <ModalBody>
          {agendamento && (
            <div>
              <p className="text-center mb-4">
                Deseja realmente marcar ausência do paciente:
                <strong> {agendamento.Paciente?.nome_paciente}</strong>, portador
                de CPF: <strong>{agendamento.Paciente?.cpf}</strong>?
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
            {isLoading ? <Spinner size="sm" /> : "Confirmar Ausência"}
          </Button>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
