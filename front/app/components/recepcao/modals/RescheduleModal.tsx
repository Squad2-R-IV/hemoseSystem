import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import { format } from "date-fns"; // Adicionar importação para formatar datas
import { formatHour, formatDateForInput } from "~/utils/recepcao/utils";

interface RescheduleModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  appointment: ReadAgendamentoDto | null;
  formData: Partial<ReadAgendamentoDto>;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isLoading?: boolean;
}

export function RescheduleModal({
  isOpen,
  onOpenChange,
  onClose,
  appointment,
  formData,
  onSubmit,  onChange,
  isLoading = false,
}: RescheduleModalProps) {

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Reagendar Consulta</ModalHeader>
        <ModalBody>
          {appointment && (
            <div>
              <p className="mb-3">
                Paciente: <strong>{appointment.Paciente?.nome_paciente}</strong>
              </p>
              <Input
                name="dt_agendamento"
                label="Data do Agendamento"
                type="date"
                placeholder="Selecione a data do agendamento"                onChange={onChange}
                className="mb-4"
                value={formatDateForInput(formData.dt_agendamento)} // Garantir formato correto
                isDisabled={isLoading}
              />
              <Select
                name="dt_hora_agendamento"
                label="Hora do Agendamento"
                placeholder="Selecione a hora"
                onChange={onChange}
                className="mb-4"
                value={formData.dt_hora_agendamento?.toString()}
                selectedKeys={formData.dt_hora_agendamento ? [formData.dt_hora_agendamento.toString()] : []}
                isDisabled={isLoading}
              >
                {Array.from({ length: 13 }, (_, i) => i + 6).map((hour) => (
                  <SelectItem key={hour.toString()}>
                    {formatHour(hour)}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            onPress={() => onSubmit()}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Confirmar"}
          </Button>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
