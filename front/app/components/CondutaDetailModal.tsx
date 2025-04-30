import React from "react";
import { Button } from "@heroui/react";

interface CondutaDetailModalProps {
  isOpen: boolean;
  conduta: string;
  onClose: () => void;
}

const CondutaDetailModal: React.FC<CondutaDetailModalProps> = ({ isOpen, conduta, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-1/2 max-w-2xl">
        <h3 className="text-lg font-bold mb-4">Detalhes da Conduta</h3>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm whitespace-pre-wrap">{conduta}</p>
        </div>
        <div className="flex justify-end">
          <Button color="primary" onPress={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CondutaDetailModal;
