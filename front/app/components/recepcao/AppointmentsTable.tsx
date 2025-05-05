import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Divider,
  Button,
} from "@heroui/react";
import { FunnelIcon, CheckCircleIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { DateValue } from "@internationalized/date";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import { formatDate } from "./utils";
import { RescheduleModal } from "./modals/RescheduleModal";
import { CheckinModal } from "./modals/CheckinModal";
import { CancelModal } from "./modals/CancelModal";
import { StatusAgendamentoEnum } from "~/utils/enums/enums";
import { useUpdateAgendamentoMutation } from "~/services/siahme-api.service";
import { UpdateAgendamentoDto } from "~/Dtos/Agendamento/UpdateAgendamentoDto";
import { addToast } from "@heroui/react";

interface AppointmentsTableProps {
  selectedDate: DateValue;
  appointments: ReadAgendamentoDto[];
  onAppointmentUpdated?: () => void;
}

export function AppointmentsTable({ 
  selectedDate, 
  appointments,
  onAppointmentUpdated 
}: AppointmentsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<ReadAgendamentoDto | null>(null);
  const [formData, setFormData] = useState<Partial<ReadAgendamentoDto>>({});
  
  // API mutation hook
  const [updateAgendamento, { isLoading }] = useUpdateAgendamentoMutation();

  const handleOpenModal = (appointment: ReadAgendamentoDto) => {
    setSelectedAppointment(appointment);
    // Set initial form data with current appointment values
    setFormData({
      dt_agendamento: appointment.dt_agendamento,
      dt_hora_agendamento: appointment.dt_hora_agendamento,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setFormData({});
  };

  const handleOpenCheckinModal = (appointment: ReadAgendamentoDto) => {
    setSelectedAppointment(appointment);
    setIsCheckinModalOpen(true);
  };

  const handleCloseCheckinModal = () => {
    setIsCheckinModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleOpenCancelModal = (appointment: ReadAgendamentoDto) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedAppointment) return;
    
    try {
      // Create update DTO
      const updateDto: UpdateAgendamentoDto = {
        dt_agendamento: formData.dt_agendamento as Date,
        dt_hora_agendamento: Number(formData.dt_hora_agendamento),
        status_agendamento: StatusAgendamentoEnum.Reagendado,
        tipo_agendamento: selectedAppointment.tipo_agendamento,
        observacoes: selectedAppointment.observacoes
      };

      // Call API to update appointment
      const result = await updateAgendamento({
        id: selectedAppointment.id,
        body: updateDto
      }).unwrap();

      addToast({
        title: "Sucesso",
        description: "Agendamento reagendado com sucesso!",
        color: "success",
      });
      
      // Notify parent component to refresh data
      if (onAppointmentUpdated) {
        onAppointmentUpdated();
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      addToast({
        title: "Erro",
        description: "Erro ao reagendar. Tente novamente.",
        color: "danger",
      });
    }
  };

  const handleCheckin = async () => {
    if (!selectedAppointment) return;
    
    try {
      const updateDto: UpdateAgendamentoDto = {
        dt_agendamento: selectedAppointment.dt_agendamento,
        dt_hora_agendamento: selectedAppointment.dt_hora_agendamento,
        tipo_agendamento: selectedAppointment.tipo_agendamento,
        status_agendamento: StatusAgendamentoEnum.Confirmado,
        dt_chegada: new Date(),
        observacoes: selectedAppointment.observacoes
      };

      await updateAgendamento({
        id: selectedAppointment.id,
        body: updateDto
      }).unwrap();

      addToast({
        title: "Sucesso",
        description: "Check-in realizado com sucesso!",
        color: "success",
      });
      
      if (onAppointmentUpdated) {
        onAppointmentUpdated();
      }

      handleCloseCheckinModal();
    } catch (error) {
      console.error("Error checking in:", error);
      addToast({
        title: "Erro",
        description: "Erro ao realizar check-in. Tente novamente.",
        color: "danger",
      });
    }
  };

  const handleCancel = async () => {
    if (!selectedAppointment) return;
    
    try {
      const updateDto: UpdateAgendamentoDto = {
        dt_agendamento: selectedAppointment.dt_agendamento,
        dt_hora_agendamento: selectedAppointment.dt_hora_agendamento,
        tipo_agendamento: selectedAppointment.tipo_agendamento,
        status_agendamento: StatusAgendamentoEnum.Cancelado,
        observacoes: selectedAppointment.observacoes
      };

      await updateAgendamento({
        id: selectedAppointment.id,
        body: updateDto
      }).unwrap();

      addToast({
        title: "Sucesso",
        description: "Agendamento cancelado com sucesso!",
        color: "success",
      });
      
      if (onAppointmentUpdated) {
        onAppointmentUpdated();
      }

      handleCloseCancelModal();
    } catch (error) {
      console.error("Error canceling appointment:", error);
      addToast({
        title: "Erro",
        description: "Erro ao cancelar. Tente novamente.",
        color: "danger",
      });
    }
  };

  // Helper function to determine if actions should be available
  const canPerformActions = (status: string): boolean => {
    return status === StatusAgendamentoEnum.Agendado;
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center px-4 py-3">
          <h2 className="text-lg font-medium">
            Pacientes Agendados {formatDate(selectedDate)}
          </h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar paciente..."
              className="w-64"
              size="sm"
            />
            <Button isIconOnly variant="light" size="sm">
              <FunnelIcon className="h-[18px] w-[18px]" />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-0">
          <Table aria-label="Pacientes agendados hoje">
            <TableHeader>
              <TableColumn>Horário</TableColumn>
              <TableColumn>Chegada</TableColumn>
              <TableColumn>Paciente</TableColumn>
              <TableColumn>Especialidade</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Ações</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Nenhum agendamento para esta data">
              {appointments.map((appointment: ReadAgendamentoDto) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {`${appointment.dt_hora_agendamento.toString()}:00`}
                  </TableCell>
                  <TableCell>
                    {appointment.dt_chegada ? new Date(appointment.dt_chegada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                  </TableCell>

                  <TableCell>{appointment.Paciente?.nome_paciente}</TableCell>
                  <TableCell>{appointment.tipo_agendamento}</TableCell>
                  <TableCell>
                    <Badge
                      color={
                        appointment.status_agendamento === StatusAgendamentoEnum.Agendado ? "warning" :
                          appointment.status_agendamento === StatusAgendamentoEnum.Confirmado ? "success" :
                            appointment.status_agendamento === StatusAgendamentoEnum.Cancelado ? "danger" :
                              appointment.status_agendamento === StatusAgendamentoEnum.Reagendado ? "primary" : "default"
                      }
                      variant="flat"
                    >
                      {appointment.status_agendamento}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {canPerformActions(appointment.status_agendamento) ? (
                        <>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="primary"
                            onClick={() => handleOpenCheckinModal(appointment)}
                            isDisabled={isLoading}
                          >
                            <CheckCircleIcon className="h-[18px] w-[18px]" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="default"
                            onClick={() => handleOpenModal(appointment)}
                            isDisabled={isLoading}
                          >
                            <ClockIcon className="h-[18px] w-[18px]" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onClick={() => handleOpenCancelModal(appointment)}
                            isDisabled={isLoading}
                          >
                            <XMarkIcon className="h-[18px] w-[18px]" />
                          </Button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">Não disponível</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Modals */}
      <RescheduleModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <CheckinModal
        isOpen={isCheckinModalOpen}
        onOpenChange={setIsCheckinModalOpen}
        onClose={handleCloseCheckinModal}
        appointment={selectedAppointment}
        onConfirm={handleCheckin}
      />

      <CancelModal
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onClose={handleCloseCancelModal}
        appointment={selectedAppointment}
        onConfirm={handleCancel}
      />
    </>
  );
}
