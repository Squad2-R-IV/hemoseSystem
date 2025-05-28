import React from "react";
import { useGetAltaMedicaByConsultaIdQuery } from "~/services/siahme-api.service";
import CreateAltaMedicaModal from "./CreateAltaMedicaModal";
import ViewAltaMedicaModal from "./ViewAltaMedicaModal";
import type { CreateAltaMedicaDto } from "~/Dtos/AltaMedica/CreateAltaMedicaDto";
import { status_consulta_enum } from "~/utils/enums/enums";

interface AltaMedicaModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  consultaId: number;
  consultaStatus: status_consulta_enum;
  userId: string;
  onCreateAltaMedica: (altaMedicaData: CreateAltaMedicaDto) => Promise<void>;
}

export default function AltaMedicaModalWrapper({
  isOpen,
  onClose,
  consultaId,
  consultaStatus,
  userId,
  onCreateAltaMedica,
}: AltaMedicaModalWrapperProps) {  // Fetch existing alta médica data for this consultation
  const { data: altaMedica, isLoading } = useGetAltaMedicaByConsultaIdQuery(
    { consultaId },
    { skip: !isOpen } // Only fetch when modal is open
  );

  const hasExistingAltaMedica = consultaStatus === status_consulta_enum.REALIZADA;

  // Show loading state while fetching data
  if (isLoading && isOpen) {
    return null; // Could show a loading modal here if needed
  }
  
  // If consultation is REALIZADA and has existing alta médica, show view modal
  if (hasExistingAltaMedica && altaMedica) {
    return (
      <ViewAltaMedicaModal
        isOpen={isOpen}
        onClose={onClose}
        altaMedica={altaMedica}
      />
    );
  }

  // Otherwise, show create modal
  return (
    <CreateAltaMedicaModal
      isOpen={isOpen}
      onClose={onClose}
      onCreateAltaMedica={onCreateAltaMedica}
      consultaId={consultaId}
      userId={userId}
    />
  );
}
