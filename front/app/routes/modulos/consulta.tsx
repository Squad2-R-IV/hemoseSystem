import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useFetchAllConsultaDetailsQuery,
  useCreateAnamneseMutation,
  useCreateCondutaMutation,
  useCreateEvolucaoMedicaMutation,
  useGetConsultasByPacientIdQuery,
  siahmeApi
} from "~/services/siahme-api.service";
import {
  Spinner,
  useDisclosure,
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  Divider,
} from "@heroui/react";
import { 
  DocumentTextIcon, 
  BookOpenIcon,
  PlusCircleIcon,
  ArrowLeftOnRectangleIcon,
  CheckCircleIcon,
  ChevronDoubleRightIcon,
  ListBulletIcon
} from "@heroicons/react/24/outline";
import { ExamsTable } from "~/components/paciente/ExamsTable";
import ConsultaDetails from "~/components/ambulatorio/ConsultaDetails";
import AnamneseDetails from "~/components/ambulatorio/AnamneseDetails";
import CreateAnamneseModal from "~/components/ambulatorio/CreateAnamneseModal";
import PrescricaoModal from "~/components/consulta/CondutaPrescricao/PrescricaoModal";
import getUserIdFromLocalStorage from "~/utils/helper/getUserIdFromLocalStorage";
import type { CreateAnamneseDto } from "~/Dtos/Anamnese/CreateAnamneseDto";
import type { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import type { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import type { ReadExameDto } from "~/Dtos/Exame/ReadExameDto";
import EvolucaoMedicaContainer from "~/components/consulta/EvolucaoMedica/EvolucaoMedicaContainer";
import { getStatusChip } from "~/utils/status";
import { ExamesModal } from "~/components/recepcao/ExamesModal";

export default function ConsultaRoute() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useFetchAllConsultaDetailsQuery({
    id: Number(id),
    includeRelations: true,
  });

  const { consulta, condutas, evolucoesMedicas, agendamento } = data || {};
  const [isExameModalOpen, setExameModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isExamesModalOpen,
    onOpen: onExamesModalOpen,
    onClose: onExamesModalClose
  } = useDisclosure();
  const {
    isOpen: isPrescricaoModalOpen,
    onOpen: onPrescricaoModalOpen,
    onClose: onPrescricaoModalClose
  } = useDisclosure();
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
  }; const handleCreateConduta = async (condutaData: CreateCondutaDto) => {
    try {
      await createConduta(condutaData).unwrap();
      refetch(); // Trigger refetch after creating conduta
    } catch (error) {
      console.error("Error creating conduta:", error);
    }
  };

  // Fetch patient consultations for reference
  const {
    data: consultas = [],
    isLoading: isLoadingConsultas,
    error: consultasError
  } = useGetConsultasByPacientIdQuery({
    pacienteId: Number(agendamento?.id_paciente)
  }, {
    skip: !agendamento?.id_paciente
  });  // State for storing exams data
  const [examesData, setExamesData] = useState<ReadExameDto[]>([]);
  const [isExamesLoading, setIsExamesLoading] = useState(false);

  // Create a lazy query function to fetch exams
  const [trigger, { isFetching: isFetchingExames }] = siahmeApi.endpoints.getExamesByPaciente.useLazyQuery();

  const handleOpenExamesModal = async () => {
    if (!agendamento?.id_paciente) {
      console.error("Patient ID not available");
      return;
    }

    setIsExamesLoading(true);
    onExamesModalOpen(); // Open modal immediately to show loading state

    try {
      const result = await trigger(Number(agendamento.id_paciente));
      if (result.data) {
        setExamesData(result.data);
      } else if (result.error) {
        console.error("Error in API response:", result.error);
        setExamesData([]);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExamesData([]);
    } finally {
      setIsExamesLoading(false);
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
          <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-3 rounded-lg shadow-sm">
            <Button
              color="primary"
              onPress={onPrescricaoModalOpen}
              className="grow sm:grow-0"
              startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>}
            >
              Prescrição
            </Button>
            
            <Button
              color="secondary"
              onPress={handleOpenExamesModal}
              className="grow sm:grow-0"
              startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>}
            >
              Exames do Paciente
            </Button>
            
            <Button
              color="warning"
              onPress={() => setExameModalOpen(true)}
              className="grow sm:grow-0"
              startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>}
            >
              Criar Exame
            </Button>

            <Button
              color="default"
              //onPress={onOpen}
              className="grow sm:grow-0"
              startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>}
            >
              Encaminhar Para Enfermaria
            </Button>

            <Button
              color="success"
              //onPress={onOpen}
              className="grow sm:grow-0"
              startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>}
            >
              Alta Médica
            </Button>
          </div>
        </div>
        
        <AnamneseDetails anamnese={consulta.Anamnese} onOpen={onOpen} />
        
        <div className="col-span-4 flex flex-col gap-4 mt-4">
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

      <PrescricaoModal
        isOpen={isPrescricaoModalOpen}
        onClose={onPrescricaoModalClose}
        condutas={condutas}
        onAddConduta={handleCreateConduta}
        userId={userId}
        consultaId={consulta.id}
      />      {/*Modal para exibir exames table*/}      <Modal
        isOpen={isExamesModalOpen}
        onClose={onExamesModalClose}
        size="4xl"
        className="max-w-5xl mx-auto"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 bg-blue-50 border-b">
            <div className="flex items-center justify-center gap-2">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold font-serif text-center">Exames do Paciente</h2>
            </div>
            {agendamento?.Paciente && (
              <p className="text-sm text-gray-500 text-center mt-1">
                {agendamento.Paciente.nome_paciente || "Paciente"} - {agendamento.Paciente.cpf || ""}
              </p>
            )}
          </ModalHeader>
          
          <div className="p-6 bg-gray-50">
            {(isExamesLoading || isFetchingExames) && examesData.length === 0 ? (
              <div className="flex flex-col justify-center items-center p-12">
                <Spinner size="lg" color="primary" />
                <p className="mt-3 text-gray-600">Carregando exames...</p>
              </div>
            ) : examesData.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <ListBulletIcon className="h-16 w-16 text-gray-300" />
                <p className="text-lg text-gray-500 mt-4">Nenhum exame encontrado para este paciente</p>
                <Button 
                  className="mt-4"
                  color="primary"
                  startContent={<PlusCircleIcon className="h-5 w-5" />}
                  onPress={() => {
                    onExamesModalClose();
                    setExameModalOpen(true);
                  }}
                >
                  Criar Novo Exame
                </Button>
              </div>
            ) : (
              <ExamsTable 
                isLoading={false}
                exames={examesData}
              />
            )}
          </div>
        </ModalContent>
      </Modal>
      
      {isExameModalOpen && (
        <ExamesModal
          onClose={() => setExameModalOpen(false)}
        />
      )}
    </div>
  );
}
