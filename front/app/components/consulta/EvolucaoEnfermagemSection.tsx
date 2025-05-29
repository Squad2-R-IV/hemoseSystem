import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import EvolucaoEnfermagemContainer from "./EvolucaoEnfermagem/EvolucaoEnfermagemContainer";

interface EvolucaoEnfermagemSectionProps {
  consultaId: number;
  funcionarioId: string;
}

export default function EvolucaoEnfermagemSection({
  consultaId,
  funcionarioId,
}: EvolucaoEnfermagemSectionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-bold">Evoluções de Enfermagem</h2>
      </CardHeader>
      <CardBody>
        <EvolucaoEnfermagemContainer
          consultaId={consultaId}
          funcionarioId={funcionarioId}
        />
      </CardBody>
    </Card>
  );
}
