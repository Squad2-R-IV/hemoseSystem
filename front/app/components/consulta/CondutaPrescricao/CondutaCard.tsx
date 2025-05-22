import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import type { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";

interface CondutaCardProps {
  conduta: ReadCondutaDto;
  onReadMore: (conduta: string) => void;
  maxLength?: number;
}

export default function CondutaCard({ 
  conduta, 
  onReadMore,
  maxLength = 20 
}: CondutaCardProps) {
  const renderCondutaText = (text: string) => {
    if (!text || text.length <= maxLength) {
      return <p className="text-sm">{text}</p>;
    }
    
    return (
      <div>
        <p className="text-sm">{text.substring(0, maxLength)}...</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onReadMore(text);
          }}
          className="text-primary-500 text-xs mt-1 hover:underline font-medium"
        >
          Ler mais
        </button>
      </div>
    );
  };

  return (
    <Card className="h-full min-h-[200px]">
      <CardHeader>
        <h4 className="font-bold">
          {new Date(conduta.dt_conduta).toLocaleDateString()}
        </h4>
      </CardHeader>
      <CardBody className="flex flex-col justify-between">
        <div className="overflow-hidden">
          {renderCondutaText(conduta.conduta)}
        </div>
        <p className="text-xs mt-2 text-gray-500">
          Por: {conduta.User?.name || "Usuário não identificado"}
          <br />
          {conduta.User?.conselho && conduta.User?.registro && (
            <>
              Registro profissional: {conduta.User.conselho}:{" "}
              {conduta.User.registro}
              <br />
            </>
          )}
          {new Date(conduta.dt_conduta).toLocaleDateString()}
        </p>
      </CardBody>
    </Card>
  );
}
