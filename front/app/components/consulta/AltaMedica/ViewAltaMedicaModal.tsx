import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
} from "@heroui/react";
import { 
  CheckCircleIcon, 
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon 
} from "@heroicons/react/24/outline";
import type { ReadAltaMedicaDto } from "~/Dtos/AltaMedica/ReadAltaMedicaDto";
import { tipo_alta_enum } from "~/utils/enums/enums";

interface ViewAltaMedicaModalProps {
  isOpen: boolean;
  onClose: () => void;
  altaMedica: ReadAltaMedicaDto;
}

const getTipoAltaColor = (tipo: string) => {
  switch (tipo) {
    case "ALTA":
      return "success";
    case "OBITO":
      return "danger";
    case "TRANSFERENCIA":
      return "warning";
    case "CURA":
      return "primary";
    case "EVASAO":
      return "secondary";
    default:
      return "default";
  }
};

const getTipoAltaLabel = (tipo: string) => {
  return tipo_alta_enum[tipo as keyof typeof tipo_alta_enum] || tipo;
};

export default function ViewAltaMedicaModal({
  isOpen,
  onClose,
  altaMedica,
}: ViewAltaMedicaModalProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      className="max-w-2xl mx-auto"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 bg-green-50 border-b">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-bold font-serif">Alta Médica Registrada</h2>
          </div>
          <p className="text-sm text-gray-500">
            Informações da alta médica do paciente
          </p>
        </ModalHeader>

        <ModalBody className="p-6">
          <div className="flex flex-col gap-6">
            {/* Tipo de Alta */}
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Tipo de Alta</p>
                <Chip 
                  color={getTipoAltaColor(altaMedica.tipo_alta)}
                  variant="flat"
                  size="lg"
                  className="mt-1"
                >
                  {getTipoAltaLabel(altaMedica.tipo_alta)}
                </Chip>
              </div>
            </div>

            <Divider />

            {/* Data da Alta */}
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Data da Alta</p>
                <p className="text-base text-gray-900 mt-1">
                  {formatDate(altaMedica.dt_alta)}
                </p>
              </div>
            </div>

            <Divider />

            {/* Médico Responsável */}
            {altaMedica.medico && (
              <>
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Médico Responsável</p>
                    <p className="text-base text-gray-900 mt-1">
                      {altaMedica.medico.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      CRM: {altaMedica.medico.registro || 'Não informado'}
                    </p>
                  </div>
                </div>

                <Divider />
              </>
            )}

            {/* Relatório de Alta */}
            <div className="flex items-start gap-3">
              <DocumentTextIcon className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Relatório de Alta</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {altaMedica.relatorio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-end">
          <Button
            color="primary"
            onPress={onClose}
            startContent={<XMarkIcon className="h-4 w-4" />}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
