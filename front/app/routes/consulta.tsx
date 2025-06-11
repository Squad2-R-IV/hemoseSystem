import React from "react";
import { useParams, useNavigate } from "react-router";
import { Spinner } from "@heroui/react";
import ConsultaDetails from "~/components/ambulatorio/ConsultaDetails";
import ConsultaActionButtons from "~/components/consulta/ConsultaActionButtons";
import AnamneseContainer from "~/components/consulta/AnamneseContainer";
import EvolucaoMedicaSection from "~/components/consulta/EvolucaoMedicaSection";
import EvolucaoEnfermagemSection from "~/components/consulta/EvolucaoEnfermagemSection";
import { getStatusChip } from "~/utils/status";
import { useConsultaData } from "~/hooks/useConsultaData";
import { useAuth } from "~/contexts/AuthContext";

export default function ConsultaRoute() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const consultaId = Number(id);
  const { userId } = useAuth();
  
  const {
    consulta,
    condutas,
    evolucoesMedicas,
    agendamento,
    isLoading,
    refetch,
  } = useConsultaData(consultaId);

  if (isLoading) {
    return <Spinner />;
  }

  if (!consulta) {
    return <div>Consulta não encontrada</div>;
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <ConsultaDetails
            consulta={consulta}
            agendamento={agendamento}
            navigate={navigate}
            getStatusChip={getStatusChip}
          />            
          <ConsultaActionButtons
            consultaId={consultaId}
            pacienteId={agendamento?.id_paciente}
            condutas={condutas}
            consulta={consulta}
            agendamento={agendamento}
            onRefetch={refetch}
          />
          
          <EvolucaoMedicaSection
            evolucoesMedicas={evolucoesMedicas}
            consultaId={consultaId}
            onRefetch={refetch}
          />
          
          <EvolucaoEnfermagemSection
            consultaId={consultaId}
            funcionarioId={userId || ""}
          />
        </div>
        
        <AnamneseContainer
          anamnese={consulta.Anamnese}
          consultaId={consultaId}
          onRefetch={refetch}
        />
      </div>
    </div>
  );
}
