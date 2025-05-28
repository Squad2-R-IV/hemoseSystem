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
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-full max-w-md mx-4">
        <div className="border-b-2 border-blue-300 pb-3 mb-2">
          <h3 className="text-xl font-serif text-center">Nova Prescrição Médica</h3>
          <p className="text-sm text-gray-500 text-center mt-1">
            HEMOSE - Centro de Hematologia e Hemoterapia
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
          <Textarea
            name="conduta"
            label="Prescrição médica"
            placeholder="Digite aqui a prescrição completa..."
            value={formData.conduta}
            onChange={handleInputChange}
            minRows={8}
            className="font-serif"
          />
        </div>
        
        <div className="flex justify-end gap-3 mt-2">
          <Button color="secondary" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleCreateConduta}>
            Salvar Prescrição
          </Button>
        </div>
      </div>
    </div>
  );
}
