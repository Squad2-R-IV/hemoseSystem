import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import type { ReadEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/ReadEvolucaoEnfermagemDto";
import { formatDate } from "~/utils/formatting";

interface EvolucaoEnfermagemItemProps {
  evolucaoEnfermagem: ReadEvolucaoEnfermagemDto;
  onReadMore: (evolucaoEnfermagem: ReadEvolucaoEnfermagemDto) => void;
  maxLength?: number;
}

export default function EvolucaoEnfermagemItem({ 
  evolucaoEnfermagem, 
  onReadMore,
  maxLength = 20 
}: EvolucaoEnfermagemItemProps) {
  const renderEvolucaoText = (text: string) => {    
    return (
      <div>
        <p className="text-sm">{text.substring(0, maxLength)}...</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onReadMore(evolucaoEnfermagem);
          }}
          className="text-primary-500 text-xs mt-1 hover:underline font-medium"
        >
            Abrir Evolução
        </button>
      </div>
    );
  };

  const getMainText = () => {
    if (evolucaoEnfermagem.conduta_enfermagem) {
      return evolucaoEnfermagem.conduta_enfermagem;
    }
    if (evolucaoEnfermagem.sinais_vitais) {
      return evolucaoEnfermagem.sinais_vitais;
    }
    if (evolucaoEnfermagem.observacoes) {
      return evolucaoEnfermagem.observacoes;
    }
    return "Evolução de enfermagem";
  };

  return (
    <Card className="h-full min-h-[200px]">
      <CardHeader>
        <h4 className="font-bold">
          {formatDate(evolucaoEnfermagem.dt_evolucao)}
        </h4>
      </CardHeader>
      <CardBody className="flex flex-col justify-between">
        <div className="overflow-hidden">
          {renderEvolucaoText(getMainText())}
        </div>
        <p className="text-xs mt-2 text-gray-500">
          Por: {evolucaoEnfermagem.Funcionario?.name || "Funcionário não identificado"}
          <br />
          {evolucaoEnfermagem.Funcionario?.conselho && evolucaoEnfermagem.Funcionario?.registro && (
            <>
              Registro profissional: {evolucaoEnfermagem.Funcionario.conselho}:{" "}
              {evolucaoEnfermagem.Funcionario.registro}
              <br />
            </>
          )}
          {formatDate(evolucaoEnfermagem.dt_evolucao)}
        </p>
      </CardBody>
    </Card>
  );
}
