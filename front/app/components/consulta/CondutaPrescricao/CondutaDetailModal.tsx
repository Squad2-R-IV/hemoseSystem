import React from "react";
import { Button, Textarea } from "@heroui/react";

interface CondutaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  condutaText: string;
}

export default function CondutaDetailModal({
  isOpen,
  onClose,
  condutaText,
}: CondutaDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-1/2 max-w-2xl">
        <h3 className="text-lg font-bold mb-4">Detalhes da Conduta</h3>
        <Textarea
          name="conduta"
          label="Descreva a conduta"
          value={condutaText}
          onChange={() => {}}
          readOnly
          className="h-48"
        />
        <div className="flex justify-end">
          <Button color="primary" onPress={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
