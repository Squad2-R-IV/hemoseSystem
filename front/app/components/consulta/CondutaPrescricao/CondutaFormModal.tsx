import React from "react";
import { Button, Textarea } from "@heroui/react";
import type { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";

interface CondutaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CreateCondutaDto;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreateConduta: () => Promise<void>;
}

export default function CondutaFormModal({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleCreateConduta,
}: CondutaFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Adicionar Conduta</h3>
        <Textarea
          name="conduta"
          label="Descreva a conduta"
          value={formData.conduta}
          onChange={handleInputChange}
        />
        <div className="flex justify-end gap-2">
          <Button color="secondary" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleCreateConduta}>
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
