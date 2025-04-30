import { useState } from "react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams, useNavigate } from "react-router";
import {
  useFetchAllConsultaDetailsQuery,
  useCreateAnamneseMutation,
  useCreateCondutaMutation,
} from "~/services/siahme-api.service";
import {
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Button,
  useDisclosure,
  Chip,
  Textarea,
} from "@heroui/react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import ConsultaDetails from "~/components/ambulatorio/ConsultaDetails";
import AnamneseDetails from "~/components/ambulatorio/AnamneseDetails";
import CreateAnamneseModal from "~/components/ambulatorio/CreateAnamneseModal";
import getUserIdFromLocalStorage from "~/utils/helper/getUserIdFromLocalStorage";
import type { CreateAnamneseDto } from "~/Dtos/Anamnese/CreateAnamneseDto";

export default function ConsultaRoute() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useFetchAllConsultaDetailsQuery({
    id: Number(id),
    includeRelations: true,
  });

  const { consulta, condutas, agendamento } = data || {};

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createAnamnese] = useCreateAnamneseMutation();
  const [createConduta] = useCreateCondutaMutation();
  const [isCondutaModalOpen, setIsCondutaModalOpen] = useState(false);
  const [condutaFormData, setCondutaFormData] = useState({
    id_consulta: 0,
    id_funcionario: "",
    conduta: "",
  });
  const [selectedConduta, setSelectedConduta] = useState<string>("");
  const [isCondutaDetailOpen, setIsCondutaDetailOpen] = useState(false);

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

  const MAX_CONDUTA_LENGTH = 150; // Maximum characters to show before "Read more"

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
      formData.id_funcionario = getUserIdFromLocalStorage();
      await createAnamnese({
        ...formData,
      }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error creating anamnese:", error);
    }
  };

  const handleCondutaInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCondutaFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddConduta = () => {
    setCondutaFormData({
      id_consulta: consulta?.id || 0,
      id_funcionario: getUserIdFromLocalStorage(),
      conduta: "",
    });
    setIsCondutaModalOpen(true);
  };

  const handleCreateConduta = async () => {
    try {
      await createConduta(condutaFormData).unwrap();
      setIsCondutaModalOpen(false);
    } catch (error) {
      console.error("Error creating conduta:", error);
    }
  };

  const handleReadMore = (conduta: string) => {
    setSelectedConduta(conduta);
    setIsCondutaDetailOpen(true);
  };

  const renderCondutaText = (conduta: string) => {
    if (conduta.length <= MAX_CONDUTA_LENGTH) {
      return <p className="text-sm">{conduta}</p>;
    }
    return (
      <>
        <p className="text-sm">{conduta.substring(0, MAX_CONDUTA_LENGTH)}...</p>
        <button
          onClick={() => handleReadMore(conduta)}
          className="text-primary-500 text-xs mt-1 hover:underline"
        >
          Ler mais
        </button>
      </>
    );
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
            agendamento={agendamento} // Pass the fetched agendamento
            navigate={navigate}
            getStatusChip={getStatusChip}
          />
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Prescrição</h3>
            </CardHeader>
            <CardBody>
              <h5 className="text-md font-bold">Condutas</h5>
              {condutas && condutas.length > 0 ? (
                <div>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                      640: { slidesPerView: 1, spaceBetween: 10 },
                      768: { slidesPerView: 2, spaceBetween: 20 },
                      1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                  >
                    {condutas.map((conduta, index) => (
                      <SwiperSlide
                        className="p-4"
                        key={`${conduta.id}-${index}`}
                      >
                        <div className="h-full">
                          <Card className="h-full min-h-[200px]">
                            <CardHeader>
                              <h4 className="font-bold">
                                {new Date(
                                  conduta.dt_conduta
                                ).toLocaleDateString()}
                              </h4>
                            </CardHeader>
                            <CardBody>
                              {renderCondutaText(conduta.conduta)}
                              <p className="text-xs mt-2 text-gray-500">
                                Por: {conduta.User?.name}
                                <br />
                                Registro profissional: {conduta.User?.conselho}:{" "}
                                {conduta.User?.registro}
                                <br />
                                {new Date(
                                  conduta.dt_conduta
                                ).toLocaleDateString()}
                              </p>
                            </CardBody>
                          </Card>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Nenhuma conduta registrada
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddConduta}
                  className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 focus:outline-none"
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
        <AnamneseDetails anamnese={consulta.Anamnese} onOpen={onOpen} />
      </div>

      <CreateAnamneseModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCreateAnamnese={handleCreateAnamnese}
      />

      {isCondutaModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Adicionar Conduta</h3>
            <Textarea
              name="conduta"
              label="Descreva a conduta"
              value={condutaFormData.conduta}
              onChange={handleCondutaInputChange}
            />
            <div className="flex justify-end gap-2">
              <Button
                color="secondary"
                onPress={() => setIsCondutaModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button color="primary" onPress={handleCreateConduta}>
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      )}

      {isCondutaDetailOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col gap-4 shadow-lg w-1/2 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">Detalhes da Conduta</h3>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm whitespace-pre-wrap">{selectedConduta}</p>
            </div>
            <div className="flex justify-end">
              <Button
                color="primary"
                onPress={() => setIsCondutaDetailOpen(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
