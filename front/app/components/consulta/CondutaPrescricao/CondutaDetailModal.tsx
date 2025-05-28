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
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-full max-w-2xl mx-4">
        <div className="border-b-2 border-blue-300 pb-3 mb-4">
          <h3 className="text-xl font-serif text-center">Detalhes da Prescrição</h3>
          <p className="text-sm text-gray-500 text-center mt-1">
            HEMOSE - Centro de Hematologia e Hemoterapia
          </p>
        </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-inner">          <div className="whitespace-pre-wrap font-serif text-lg p-3 max-h-[40vh] overflow-y-auto">
            {condutaText}
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            color="secondary" 
            variant="light" 
            onPress={() => {
              const blob = new Blob([condutaText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'prescricao.txt';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
          >
            Imprimir/Salvar
          </Button>
          <Button color="primary" onPress={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
