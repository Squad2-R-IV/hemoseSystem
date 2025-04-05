import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetConsultaByIdQuery,
  useCreateAnamneseMutation,
} from "~/services/siahme-api.service";
import {
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Button,
  useDisclosure,
  Chip,
} from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ConsultaDetails from "~/components/ambulatorio/ConsultaDetails";
import AnamneseDetails from "~/components/ambulatorio/AnamneseDetails";
import CreateAnamneseModal from "~/components/ambulatorio/CreateAnamneseModal";

export default function ConsultaRoute() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: consultaData, isLoading } = useGetConsultaByIdQuery({
    id: Number(id),
    includeRelations: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createAnamnese] = useCreateAnamneseMutation();
  const [formData, setFormData] = useState({
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
  });

  const getStatusChip = (status: string) => {
    let color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" = "default";
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
    return <Chip variant="flat" color={color}>{status}</Chip>;
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!consultaData) {
    return <div>Consulta não encontrada</div>;
  }

  const { consulta, agendamento } = consultaData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAnamnese = async () => {
    try {
      await createAnamnese({
        id_consulta: consulta.id,
        id_funcionario: "currentUserId", // Replace with actual user ID
        ...formData,
      }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error creating anamnese:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Consulta Card (Left and Center) */}
        <div className="col-span-3 flex flex-col gap-4">
          <ConsultaDetails
            consulta={consulta}
            agendamento={agendamento}
            navigate={navigate}
            getStatusChip={getStatusChip}
          />
          <Card >
            <CardHeader>
              <h3 className="text-lg font-bold">Prescrição</h3>
            </CardHeader>
            <CardBody>
              <h5>Condutas</h5>

            </CardBody>
          </Card>
        </div>
        {/* Anamnese Card (Right) */}

        <AnamneseDetails
          anamnese={consulta.Anamneses}
          onOpen={onOpen}
        />

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