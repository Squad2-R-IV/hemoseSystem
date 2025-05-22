import React, { useState } from "react";
import type { ReadEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";
import type { CreateEvolucaoMedicaDto } from "~/Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import CardCarousel from "../CardCarousel";
import EvolucaoMedicaItem from "./EvolucaoMedicaItem";
import EvolucaoMedicaDetailModal from "./EvolucaoMedicaDetailModal";
import EvolucaoMedicaFormModal from "./EvolucaoMedicaFormModal";

interface EvolucaoMedicaCardProps {
  evolucoesMedicas: ReadEvolucaoMedicaDto[] | undefined;
  onAddEvolucaoMedica: (evolucaoMedica: CreateEvolucaoMedicaDto) => Promise<void>;
  userId: string;
  consultaId: number;
  MAX_EVOLUCAO_LENGTH?: number;
}

export default function EvolucaoMedicaCard({
  evolucoesMedicas,
  onAddEvolucaoMedica,
  userId,
  consultaId,
  MAX_EVOLUCAO_LENGTH = 150,
}: EvolucaoMedicaCardProps) {
  // State for modals
  const [isEvolucaoModalOpen, setIsEvolucaoModalOpen] = useState(false);
  const [isEvolucaoDetailOpen, setIsEvolucaoDetailOpen] = useState(false);
  const [selectedEvolucao, setSelectedEvolucao] = useState<ReadEvolucaoMedicaDto | null>(null);
  const [evolucaoFormData, setEvolucaoFormData] = useState<CreateEvolucaoMedicaDto>({
    id_consulta: consultaId,
    id_funcionario: userId,
    conduta: "",
    queixas: "",
    exame_fisico: "",
    observacoes: ""
  });

  // Handlers for modals
  const handleOpenAddModal = () => {
    setEvolucaoFormData({
      id_consulta: consultaId,
      id_funcionario: userId,
      conduta: "",
      queixas: "",
      exame_fisico: "",
      observacoes: ""
    });
    setIsEvolucaoModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsEvolucaoModalOpen(false);
  };

  const handleReadMore = (evolucaoMedica: ReadEvolucaoMedicaDto) => {
    setSelectedEvolucao(evolucaoMedica);
    setIsEvolucaoDetailOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsEvolucaoDetailOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvolucaoFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEvolucaoMedica = async () => {
    try {
      await onAddEvolucaoMedica(evolucaoFormData);
      setIsEvolucaoModalOpen(false);
    } catch (error) {
      console.error("Error creating evolução médica:", error);
    }
  };

  const renderEvolucaoMedicaItem = (evolucaoMedica: ReadEvolucaoMedicaDto, index: number) => (
    <EvolucaoMedicaItem
      key={`${evolucaoMedica.id}-${index}`}
      evolucaoMedica={evolucaoMedica}
      onReadMore={handleReadMore}
      maxLength={MAX_EVOLUCAO_LENGTH}
    />
  );

  return (
    <>
      <CardCarousel
        title="Evoluções Médicas"
        items={evolucoesMedicas}
        renderItem={renderEvolucaoMedicaItem}
        emptyMessage="Nenhuma evolução médica registrada"
        showAddButton={true}
        onAddClick={handleOpenAddModal}
      />

      {/* Modals */}
      <EvolucaoMedicaFormModal
        isOpen={isEvolucaoModalOpen}
        onClose={handleCloseAddModal}
        formData={evolucaoFormData}
        handleInputChange={handleInputChange}
        handleCreateEvolucaoMedica={handleCreateEvolucaoMedica}
      />

      <EvolucaoMedicaDetailModal
        isOpen={isEvolucaoDetailOpen}
        onClose={handleCloseDetailModal}
        evolucaoMedica={selectedEvolucao}
      />
    </>
  );
}
