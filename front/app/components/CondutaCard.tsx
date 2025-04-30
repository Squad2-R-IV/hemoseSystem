import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";

interface CondutaCardProps {
  dtConduta: Date;
  conduta: string;
  renderCondutaText: (conduta: string) => React.ReactNode;
}

const CondutaCard: React.FC<CondutaCardProps> = ({ dtConduta, conduta, renderCondutaText }) => {
  return (
    <Card className="h-full min-h-[200px]">
      <CardHeader>
        <h4 className="font-bold">{new Date(dtConduta).toLocaleDateString()}</h4>
      </CardHeader>
      <CardBody>
        {renderCondutaText(conduta)}
        <p className="text-xs mt-2 text-gray-500">
          {new Date(dtConduta).toLocaleDateString()}
        </p>
      </CardBody>
    </Card>
  );
};

export default CondutaCard;
