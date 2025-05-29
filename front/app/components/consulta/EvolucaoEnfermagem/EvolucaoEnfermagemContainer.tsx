import React, { useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { ReadEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/ReadEvolucaoEnfermagemDto";
import { useGetEvolucoesEnfermagemByConsultaIdQuery } from "~/services/api";
import EvolucaoEnfermagemItem from "./EvolucaoEnfermagemItem";
import EvolucaoEnfermagemDetailModal from "./EvolucaoEnfermagemDetailModal";
import EvolucaoEnfermagemFormModal from "./EvolucaoEnfermagemFormModal";

interface EvolucaoEnfermagemContainerProps {
  consultaId: number;
  funcionarioId: string;
}

export default function EvolucaoEnfermagemContainer({
  consultaId,
  funcionarioId,
}: EvolucaoEnfermagemContainerProps) {
  const [selectedEvolucao, setSelectedEvolucao] = useState<ReadEvolucaoEnfermagemDto | null>(null);
  const [editingEvolucao, setEditingEvolucao] = useState<ReadEvolucaoEnfermagemDto | null>(null);

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  const {
    isOpen: isFormModalOpen,
    onOpen: onFormModalOpen,
    onClose: onFormModalClose,
  } = useDisclosure();
  const {
    data: evolucoesEnfermagem,
    isLoading,
    refetch,
  } = useGetEvolucoesEnfermagemByConsultaIdQuery({ consultaId });

  const handleReadMore = (evolucao: ReadEvolucaoEnfermagemDto) => {
    setSelectedEvolucao(evolucao);
    onDetailModalOpen();
  };

  const handleEdit = (evolucao: ReadEvolucaoEnfermagemDto) => {
    setEditingEvolucao(evolucao);
    onFormModalOpen();
  };

  const handleCreateNew = () => {
    setEditingEvolucao(null);
    onFormModalOpen();
  };

  const handleModalClose = () => {
    setEditingEvolucao(null);
    onFormModalClose();
  };

  const handleSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p>Carregando evoluções de enfermagem...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Evoluções de Enfermagem</h3>        <Button
          color="primary"
          startContent={<PlusIcon className="h-4 w-4" />}
          onPress={handleCreateNew}
        >
          Nova Evolução
        </Button>
      </div>

      {!evolucoesEnfermagem || evolucoesEnfermagem.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma evolução de enfermagem registrada.</p>          <Button
            color="primary"
            variant="light"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={handleCreateNew}
            className="mt-2"
          >
            Criar primeira evolução
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evolucoesEnfermagem.map((evolucao) => (
            <EvolucaoEnfermagemItem
              key={evolucao.id}
              evolucaoEnfermagem={evolucao}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      )}

      <EvolucaoEnfermagemDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        evolucaoEnfermagem={selectedEvolucao}
        onEdit={handleEdit}
      />

      <EvolucaoEnfermagemFormModal
        isOpen={isFormModalOpen}
        onClose={handleModalClose}
        consultaId={consultaId}
        funcionarioId={funcionarioId}
        evolucaoEnfermagem={editingEvolucao}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
