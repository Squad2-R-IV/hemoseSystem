import { useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router";
import {
  useFetchAllConsultaDetailsQuery,
  useCreateAnamneseMutation,
  useCreateCondutaMutation,
  useCreateEvolucaoMedicaMutation,
} from "~/services/siahme-api.service";
import {
  Spinner,
  useDisclosure,
  Chip,
} from "@heroui/react";
import ConsultaDetails from "~/components/ambulatorio/ConsultaDetails";
import AnamneseDetails from "~/components/ambulatorio/AnamneseDetails";
import CreateAnamneseModal from "~/components/ambulatorio/CreateAnamneseModal";
import PrescricaoCard from "~/components/consulta/CondutaPrescricao/PrescricaoCard";
import getUserIdFromLocalStorage from "~/utils/helper/getUserIdFromLocalStorage";
import type { CreateAnamneseDto } from "~/Dtos/Anamnese/CreateAnamneseDto";
import type { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import type { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import EvolucaoMedicaContainer from "~/components/consulta/EvolucaoMedica/EvolucaoMedicaContainer";

export default function ConsultaRoute() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useFetchAllConsultaDetailsQuery({
    id: Number(id),
    includeRelations: true,
  });

  const { consulta, condutas, evolucoesMedicas, agendamento } = data || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createAnamnese] = useCreateAnamneseMutation();
  const [createConduta] = useCreateCondutaMutation();
  const [createEvolucaoMedica] = useCreateEvolucaoMedicaMutation();
  const [formData, setFormData] = useState<CreateAnamneseDto>(() => ({
    id_consulta: 0,
    id_funcionario: "",
    cid: "",
    queixa_principal: "",
    historia_doenca_atual: "",
    antecedentes_pessoais: "",
    antecedentes_familiares: "",
    habitos_vida: "",
    medicamentos_em_uso: "",
    alergias: "",
    cirurgias_previas: "",
    observacoes: "",
  }));

  const userId = getUserIdFromLocalStorage();

  const getStatusChip = (status: string) => {
    let color:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger" = "default";
    switch (status) {
      case "AGUARDANDO":
        color = "warning";
        break;
      case "EM_ATENDIMENTO":
        color = "primary";
        break;
      case "CHAMADO":
        color = "secondary";
        break;
      case "FINALIZADO":
        color = "success";
        break;
      case "CANCELADO":
        color = "danger";
        break;
      default:
        color = "default";
    }
    return (
      <Chip variant="flat" color={color}>
        {status}
      </Chip>
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAnamnese = async () => {
    try {
      formData.id_consulta = consulta?.id || 0;
      formData.id_funcionario = userId;
      await createAnamnese({
        ...formData,
      }).unwrap();
      onClose();
      refetch(); // Trigger refetch after creating anamnese
    } catch (error) {
      console.error("Error creating anamnese:", error);
    }
  };
  const handleCreateConduta = async (condutaData: CreateCondutaDto) => {
    try {
      await createConduta(condutaData).unwrap();
      refetch(); // Trigger refetch after creating conduta
    } catch (error) {
      console.error("Error creating conduta:", error);
    }
  };
  
  const handleCreateEvolucaoMedica = async (evolucaoMedicaData: CreateEvolucaoMedicaDto) => {
    try {
      await createEvolucaoMedica(evolucaoMedicaData).unwrap();
      refetch(); // Trigger refetch after creating evolução médica
    } catch (error) {
      console.error("Error creating evolução médica:", error);
    }
  };

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
          <PrescricaoCard 
            condutas={condutas} 
            onAddConduta={handleCreateConduta}
            userId={userId}
            consultaId={consulta.id}
            MAX_CONDUTA_LENGTH={150}
          />
        </div>
        <AnamneseDetails anamnese={consulta.Anamnese} onOpen={onOpen} />        <div className="col-span-4 flex flex-col gap-4">
          <EvolucaoMedicaContainer
            evolucoesMedicas={evolucoesMedicas}
            onAddEvolucaoMedica={handleCreateEvolucaoMedica}
            userId={userId}
            consultaId={consulta.id}
            MAX_EVOLUCAO_LENGTH={150}
          />  
        </div>
      </div>

      <CreateAnamneseModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCreateAnamnese={handleCreateAnamnese}
      />
    </div>
  );
}
