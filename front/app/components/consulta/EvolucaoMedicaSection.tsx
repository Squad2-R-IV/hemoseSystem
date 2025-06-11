import React from "react";
import EvolucaoMedicaContainer from "~/components/consulta/EvolucaoMedica/EvolucaoMedicaContainer";
import { useCreateEvolucaoMedicaMutation } from "~/services/siahme-api.service";
import type { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import type { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";
import { useAuth } from "~/contexts/AuthContext";

interface EvolucaoMedicaSectionProps {
  evolucoesMedicas?: ReadEvolucaoMedicaDto[];
  consultaId: number;
  onRefetch: () => void;
}

export default function EvolucaoMedicaSection({
  evolucoesMedicas,
  consultaId,
  onRefetch,
}: EvolucaoMedicaSectionProps) {
  const [createEvolucaoMedica] = useCreateEvolucaoMedicaMutation();
  const { userId } = useAuth();

  const handleCreateEvolucaoMedica = async (evolucaoMedicaData: CreateEvolucaoMedicaDto) => {
    try {
      await createEvolucaoMedica(evolucaoMedicaData).unwrap();
      onRefetch();
    } catch (error) {
      console.error("Error creating evolução médica:", error);
    }
  };

  return (
    <div className="col-span-4 flex flex-col gap-4 mt-4">
      <EvolucaoMedicaContainer
        evolucoesMedicas={evolucoesMedicas}
        onAddEvolucaoMedica={handleCreateEvolucaoMedica}
        userId={userId || ""}
        consultaId={consultaId}
        MAX_EVOLUCAO_LENGTH={150}
      />
    </div>
  );
}
