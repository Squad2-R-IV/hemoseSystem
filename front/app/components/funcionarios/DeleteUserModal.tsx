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
import { ReadUserDto } from "~/Dtos/User/ReadUser.dto";

interface DeleteUserModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  user: ReadUserDto | null;
  onConfirm: () => Promise<boolean | undefined>;
  isLoading: boolean;
}

export function DeleteUserModal({
  isOpen,
  onOpenChange,
  onClose,
  user,
  onConfirm,
  isLoading,
}: DeleteUserModalProps) {
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
        <ModalHeader>Excluir Funcionário</ModalHeader>
        <ModalBody>
          {user && (
            <div>
              <p className="text-center mb-4">
                Deseja realmente excluir o funcionário:
                <strong> {user.name}</strong>,
                portador de CPF: <strong>{user.cpf}</strong>?
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
