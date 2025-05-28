import React from "react";
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import {
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  BeakerIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import PrescricaoModal from "~/components/consulta/CondutaPrescricao/PrescricaoModal";
import AltaMedicaModalWrapper from "~/components/consulta/AltaMedica/AltaMedicaModalWrapper";
import { ExamesModal } from "~/components/recepcao/ExamesModal";
import ExamesListModal from "~/components/consulta/ExamesListModal";
import {
  useCreateCondutaMutation,
  useCreateAltaMedicaMutation,
  useUpdateConsultaMutation,
} from "~/services/siahme-api.service";
import type { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import type { CreateAltaMedicaDto } from "~/Dtos/AltaMedica/CreateAltaMedicaDto";
import type { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";
import type { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";
import { status_consulta_enum } from "~/utils/enums/enums";
import getUserIdFromLocalStorage from "~/utils/helper/getUserIdFromLocalStorage";

interface ConsultaActionButtonsProps {
  consultaId: number;
  pacienteId?: number;
  condutas?: ReadCondutaDto[];
  consulta: ReadConsultaDto; // Add consulta to get status
  agendamento?: any; // Add agendamento to get patient info
  onRefetch: () => void;
}

export default function ConsultaActionButtons({
  consultaId,
  pacienteId,
  condutas,
  consulta,
  agendamento,
  onRefetch,
}: ConsultaActionButtonsProps) {
  const userId = getUserIdFromLocalStorage();

  // Disclosure hooks for modals
  const {
    isOpen: isPrescricaoModalOpen,
    onOpen: onPrescricaoModalOpen,
    onClose: onPrescricaoModalClose,
  } = useDisclosure();

  const {
    isOpen: isAltaMedicaModalOpen,
    onOpen: onAltaMedicaModalOpen,
    onClose: onAltaMedicaModalClose,
  } = useDisclosure();

  const {
    isOpen: isExameModalOpen,
    onOpen: onExameModalOpen,
    onClose: onExameModalClose,
  } = useDisclosure();
  const {
    isOpen: isExamesListModalOpen,
    onOpen: onExamesListModalOpen,
    onClose: onExamesListModalClose,
  } = useDisclosure();

  const {
    isOpen: isEnfermariaModalOpen,
    onOpen: onEnfermariaModalOpen,
    onClose: onEnfermariaModalClose,
  } = useDisclosure();

  // Mutations
  const [createConduta] = useCreateCondutaMutation();
  const [createAltaMedica] = useCreateAltaMedicaMutation();
  const [updateConsulta] = useUpdateConsultaMutation();

  const handleCreateConduta = async (condutaData: CreateCondutaDto) => {
    try {
      await createConduta(condutaData).unwrap();
      onRefetch();
    } catch (error) {
      console.error("Error creating conduta:", error);
    }
  };
  const handleCreateAltaMedica = async (altaMedicaData: CreateAltaMedicaDto) => {
    try {
      await createAltaMedica(altaMedicaData).unwrap();

      // Update consultation status to "REALIZADA" after successful alta médica creation
      await updateConsulta({
        id: consultaId,
        body: {
          status: status_consulta_enum.REALIZADA,
        },
      }).unwrap();

      onRefetch();
      onAltaMedicaModalClose();
    } catch (error) {
      console.error("Error creating alta médica:", error);
    }
  };

  const handleEncaminharEnfermaria = async () => {
    try {
      await updateConsulta({
        id: consultaId,
        body: {
          status: status_consulta_enum.AGUARDANDO_ACOLHIMENTO,
        },
      }).unwrap();

      onRefetch();
      onEnfermariaModalClose();
    } catch (error) {
      console.error("Error encaminhando para enfermaria:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-3 rounded-lg shadow-sm">
        <Button
          color="primary"
          onPress={onPrescricaoModalOpen}
          className="grow sm:grow-0"
          startContent={<ClipboardDocumentListIcon className="w-5 h-5" />}
        >
          Prescrição
        </Button>

        <Button
          color="secondary"
          onPress={onExamesListModalOpen}
          className="grow sm:grow-0"
          startContent={<DocumentTextIcon className="w-5 h-5" />}
          isDisabled={!pacienteId}
        >
          Exames do Paciente
        </Button>        {/* Criar Exame - disponível para todos os status exceto REALIZADA, AGUARDANDO_ACOLHIMENTO e ENFERMARIA */}
        {consulta.status !== status_consulta_enum.REALIZADA &&
          consulta.status !== status_consulta_enum.AGUARDANDO_ACOLHIMENTO &&
          consulta.status !== status_consulta_enum.ENFERMARIA && (
            <Button
              color="warning"
              onPress={onExameModalOpen}
              className="grow sm:grow-0"
              startContent={<BeakerIcon className="w-5 h-5" />}
            >
              Criar Exame
            </Button>
          )}

        {/* Encaminhar Para Enfermaria - disponível apenas para status em atendimento, não para finalizados */}
        {consulta.status !== status_consulta_enum.REALIZADA &&
          consulta.status !== status_consulta_enum.AGUARDANDO_ACOLHIMENTO &&
          consulta.status !== status_consulta_enum.ENFERMARIA && (
            <Button
              color="default"
              onPress={onEnfermariaModalOpen}
              className="grow sm:grow-0"
              startContent={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
            >
              Encaminhar Para Enfermaria
            </Button>
          )}

        {consulta.status !== status_consulta_enum.REALIZADA && (
          <Button
            color="success"
            onPress={onAltaMedicaModalOpen}
            className="grow sm:grow-0"
            startContent={<CheckCircleIcon className="w-5 h-5" />}
          >
            {consulta.status === status_consulta_enum.REALIZADA ? "Ver Alta Médica" : "Alta Médica"}
          </Button>
        )
        }



      </div>

      {/* Modals */}
      <PrescricaoModal
        isOpen={isPrescricaoModalOpen}
        onClose={onPrescricaoModalClose}
        condutas={condutas}
        onAddConduta={handleCreateConduta}
        userId={userId}
        consultaId={consultaId}
      />
      <AltaMedicaModalWrapper
        isOpen={isAltaMedicaModalOpen}
        onClose={onAltaMedicaModalClose}
        consultaId={consultaId}
        consultaStatus={consulta.status}
        userId={userId}
        onCreateAltaMedica={handleCreateAltaMedica}
      />

      {isExameModalOpen && (
        <ExamesModal onClose={onExameModalClose} />
      )}      {pacienteId && (
        <ExamesListModal
          isOpen={isExamesListModalOpen}
          onClose={onExamesListModalClose}
          pacienteId={pacienteId}
          onCreateExame={onExameModalOpen}
          pacienteNome={agendamento?.Paciente?.nome_paciente}
          pacienteCpf={agendamento?.Paciente?.cpf}
        />
      )}

      {/* Modal de Confirmação - Encaminhar para Enfermaria */}
      <Modal isOpen={isEnfermariaModalOpen} onClose={onEnfermariaModalClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirmar Encaminhamento
          </ModalHeader>
          <ModalBody>
            <p>
              Deseja realmente encaminhar o paciente <strong>{agendamento?.Paciente?.nome_paciente}</strong> para a enfermaria?
            </p>
            <p className="text-sm text-gray-600">
              O status da consulta será alterado para "Aguardando Acolhimento".
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onEnfermariaModalClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleEncaminharEnfermaria}>
              Confirmar Encaminhamento
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
