import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import type { ReadEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/ReadEvolucaoEnfermagemDto";
import { formatDate } from "~/utils/formatting";

interface EvolucaoEnfermagemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  evolucaoEnfermagem: ReadEvolucaoEnfermagemDto | null;
  onEdit?: (evolucaoEnfermagem: ReadEvolucaoEnfermagemDto) => void;
}

export default function EvolucaoEnfermagemDetailModal({
  isOpen,
  onClose,
  evolucaoEnfermagem,
  onEdit,
}: EvolucaoEnfermagemDetailModalProps) {
  if (!evolucaoEnfermagem) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-lg font-bold">Evolução de Enfermagem</h3>
          <p className="text-sm text-gray-500">
            {formatDate(evolucaoEnfermagem.dt_evolucao)}
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Profissional:</h4>
              <p className="text-sm">
                {evolucaoEnfermagem.Funcionario?.name || "Funcionário não identificado"}
                {evolucaoEnfermagem.Funcionario?.conselho && evolucaoEnfermagem.Funcionario?.registro && (
                  <span className="text-gray-500">
                    {" "}
                    - {evolucaoEnfermagem.Funcionario.conselho}: {evolucaoEnfermagem.Funcionario.registro}
                  </span>
                )}
              </p>
            </div>

            {evolucaoEnfermagem.sinais_vitais && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Sinais Vitais:</h4>
                <p className="text-sm whitespace-pre-wrap">
                  {evolucaoEnfermagem.sinais_vitais}
                </p>
              </div>
            )}

            {evolucaoEnfermagem.conduta_enfermagem && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Conduta de Enfermagem:</h4>
                <p className="text-sm whitespace-pre-wrap">
                  {evolucaoEnfermagem.conduta_enfermagem}
                </p>
              </div>
            )}

            {evolucaoEnfermagem.observacoes && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Observações:</h4>
                <p className="text-sm whitespace-pre-wrap">
                  {evolucaoEnfermagem.observacoes}
                </p>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Fechar
          </Button>
          {onEdit && (
            <Button 
              color="primary" 
              onPress={() => {
                onEdit(evolucaoEnfermagem);
                onClose();
              }}
            >
              Editar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
