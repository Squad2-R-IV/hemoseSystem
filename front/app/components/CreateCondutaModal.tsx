import React from "react";
import { Button, Textarea } from "@heroui/react";

interface CreateCondutaModalProps {
  isOpen: boolean;
  onClose: () => void;
  conduta: string;
  onCondutaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  onCreate: () => void;
}

const CreateCondutaModal: React.FC<CreateCondutaModalProps> = ({
  isOpen,
  onClose,
  conduta,
  onCondutaChange,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Adicionar Conduta</h3>
        <Textarea
          name="conduta"
          label="Descreva a conduta"
          value={conduta}
          onChange={onCondutaChange}
        />
        <div className="flex justify-end gap-2">
          <Button color="secondary" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={onCreate}>
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCondutaModal;
