import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import type { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";
import { formatDate } from "~/utils/formatting";

interface EvolucaoMedicaItemProps {
  evolucaoMedica: ReadEvolucaoMedicaDto;
  onReadMore: (evolucaoMedica: ReadEvolucaoMedicaDto) => void;
  maxLength?: number;
}

export default function EvolucaoMedicaItem({ 
  evolucaoMedica, 
  onReadMore,
  maxLength = 20 
}: EvolucaoMedicaItemProps) {
  const renderEvolucaoText = (text: string) => {    
    return (
      <div>
        <p className="text-sm">{text.substring(0, maxLength)}...</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onReadMore(evolucaoMedica);
          }}
          className="text-primary-500 text-xs mt-1 hover:underline font-medium"
        >
            Abrir Evolução
        </button>
      </div>
    );
  };

  return (
    <Card className="h-full min-h-[200px]">      <CardHeader>
        <h4 className="font-bold">
          {formatDate(evolucaoMedica.dt_evolucao)}
        </h4>
      </CardHeader>
      <CardBody className="flex flex-col justify-between">
        <div className="overflow-hidden">
          {renderEvolucaoText(evolucaoMedica.conduta)}
        </div>
        <p className="text-xs mt-2 text-gray-500">
          Por: {evolucaoMedica.Usuario?.name || "Usuário não identificado"}
          <br />
          {evolucaoMedica.Usuario?.conselho && evolucaoMedica.Usuario?.registro && (
            <>
              Registro profissional: {evolucaoMedica.Usuario.conselho}:{" "}
              {evolucaoMedica.Usuario.registro}
              <br />
            </>
          )}
          {formatDate(evolucaoMedica.dt_evolucao)}
        </p>
      </CardBody>
    </Card>
  );
}
