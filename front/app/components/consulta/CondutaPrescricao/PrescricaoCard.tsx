import React, { useState } from "react";
import type { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";
import type { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import CardCarousel from "../CardCarousel";
import CondutaCard from "./CondutaCard";
import CondutaFormModal from "./CondutaFormModal";
import CondutaDetailModal from "./CondutaDetailModal";

interface PrescricaoCardProps {
  condutas: ReadCondutaDto[] | undefined;
  onAddConduta: (conduta: CreateCondutaDto) => Promise<void>;
  userId: string;
  consultaId: number;
  MAX_CONDUTA_LENGTH?: number;
}

export default function PrescricaoCard({
  condutas,
  onAddConduta,
  userId,
  consultaId,
  MAX_CONDUTA_LENGTH = 150,
}: PrescricaoCardProps) {
  // State for modals
  const [isCondutaModalOpen, setIsCondutaModalOpen] = useState(false);
  const [isCondutaDetailOpen, setIsCondutaDetailOpen] = useState(false);
  const [selectedConduta, setSelectedConduta] = useState<string>("");
  const [condutaFormData, setCondutaFormData] = useState<CreateCondutaDto>({
    id_consulta: consultaId,
    id_funcionario: userId,
    conduta: "",
  });

  // Handlers for modals
  const handleOpenAddModal = () => {
    setCondutaFormData({
      id_consulta: consultaId,
      id_funcionario: userId,
      conduta: "",
    });
    setIsCondutaModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsCondutaModalOpen(false);
  };

  const handleReadMore = (conduta: string) => {
    setSelectedConduta(conduta);
    setIsCondutaDetailOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsCondutaDetailOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCondutaFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateConduta = async () => {
    try {
      await onAddConduta(condutaFormData);
      setIsCondutaModalOpen(false);
    } catch (error) {
      console.error("Error creating conduta:", error);
    }
  };

  const renderCondutaCard = (conduta: ReadCondutaDto, index: number) => (
    <CondutaCard
      key={`${conduta.id}-${index}`}
      conduta={conduta}
      onReadMore={handleReadMore}
      maxLength={MAX_CONDUTA_LENGTH}
    />
  );

  return (
    <>
      <CardCarousel
        title="Prescrição"
        items={condutas}
        renderItem={renderCondutaCard}
        emptyMessage="Nenhuma conduta registrada"
        showAddButton={true}
        onAddClick={handleOpenAddModal}
      />

      {/* Modals */}
      <CondutaFormModal
        isOpen={isCondutaModalOpen}
        onClose={handleCloseAddModal}
        formData={condutaFormData}
        handleInputChange={handleInputChange}
        handleCreateConduta={handleCreateConduta}
      />

      <CondutaDetailModal
        isOpen={isCondutaDetailOpen}
        onClose={handleCloseDetailModal}
        condutaText={selectedConduta}
      />
    </>
  );
}
