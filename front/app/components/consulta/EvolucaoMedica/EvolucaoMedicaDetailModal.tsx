import React from "react";
import { Button, Textarea } from "@heroui/react";
import type { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";

interface EvolucaoMedicaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  evolucaoMedica: ReadEvolucaoMedicaDto | null;
}

export default function EvolucaoMedicaDetailModal({
  isOpen,
  onClose,
  evolucaoMedica,
}: EvolucaoMedicaDetailModalProps) {
  if (!isOpen || !evolucaoMedica) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-2">Detalhes da Evolução Médica</h3>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1">Data</h4>
          <p>{new Date(evolucaoMedica.dt_evolucao).toLocaleDateString()}</p>
        </div>

        {evolucaoMedica.queixas && (
          <Textarea
            name="queixas"
            label="Queixas"
            value={evolucaoMedica.queixas}
            readOnly
          />
        )}

        {evolucaoMedica.exame_fisico && (
          <Textarea
            name="exame_fisico"
            label="Exame Físico"
            value={evolucaoMedica.exame_fisico}
            readOnly
          />
        )}

        <Textarea
          name="conduta"
          label="Conduta"
          value={evolucaoMedica.conduta}
          readOnly
        />

        {evolucaoMedica.observacoes && (
          <Textarea
            name="observacoes"
            label="Observações"
            value={evolucaoMedica.observacoes}
            readOnly
          />
        )}

        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Por: {evolucaoMedica.User?.name || "Usuário não identificado"}
            {evolucaoMedica.User?.conselho && evolucaoMedica.User?.registro && (
              <>
                <br />
                Registro profissional: {evolucaoMedica.User.conselho}:{" "}
                {evolucaoMedica.User.registro}
              </>
            )}
          </p>
        </div>

        <div className="flex justify-end mt-2">
          <Button color="primary" onPress={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
