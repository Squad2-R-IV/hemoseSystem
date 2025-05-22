import React from "react";
import { Button, Textarea } from "@heroui/react";
import type { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";

interface EvolucaoMedicaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CreateEvolucaoMedicaDto;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreateEvolucaoMedica: () => Promise<void>;
}

export default function EvolucaoMedicaFormModal({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleCreateEvolucaoMedica,
}: EvolucaoMedicaFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-2">Adicionar Evolução Médica</h3>
        
        <Textarea
          name="queixas"
          label="Queixas"
          value={formData.queixas || ""}
          onChange={handleInputChange}
          placeholder="Descreva as queixas do paciente"
        />
        
        <Textarea
          name="exame_fisico"
          label="Exame Físico"
          value={formData.exame_fisico || ""}
          onChange={handleInputChange}
          placeholder="Descreva os resultados do exame físico"
        />
        
        <Textarea
          name="conduta"
          label="Conduta"
          value={formData.conduta}
          onChange={handleInputChange}
          placeholder="Descreva a conduta médica adotada"
          required
        />
        
        <Textarea
          name="observacoes"
          label="Observações"
          value={formData.observacoes || ""}
          onChange={handleInputChange}
          placeholder="Observações adicionais"
        />
        
        <div className="flex justify-end gap-2 mt-2">
          <Button color="secondary" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleCreateEvolucaoMedica}>
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
