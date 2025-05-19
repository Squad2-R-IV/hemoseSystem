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
import { formatDate, formatDateForApi } from "../../utils/recepcao/utils";
import { RescheduleModal } from "./modals/RescheduleModal";
import { CheckinModal } from "./modals/CheckinModal";
import { CancelModal } from "./modals/CancelModal";
import { StatusAgendamentoEnum } from "~/utils/enums/enums";
import { useGetAgendamentosByDateQuery } from "~/services/siahme-api.service";
import { useAppointmentActions } from "~/hooks/recepcao/useAppointmentActions";

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
  // Modal visibility states
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  
  // Format date for the query
  const formattedDate = formatDateForApi(selectedDate);

  // Check if we should manage our own data
  const shouldFetchDirectly = !onAppointmentUpdated;
  
  // Only manage our own data if not provided by parent
  const { refetch } = useGetAgendamentosByDateQuery({ 
    date: formattedDate 
  }, {
    skip: !shouldFetchDirectly,
    refetchOnMountOrArgChange: true
  });

  // Use our custom hook to handle appointment actions
  const {
    selectedAppointment,
    formData,
    isRescheduling,
    isCheckingIn,
    isCanceling,
    selectAppointment,
    clearSelection,
    handleChange,
    rescheduleAppointment,
    checkInAppointment,
    cancelAppointment,
    canPerformActions
  } = useAppointmentActions({
    onAppointmentUpdated,
    refetchAppointments: shouldFetchDirectly ? refetch : undefined
  });

  // Modal handlers
  const handleOpenRescheduleModal = (appointment: ReadAgendamentoDto) => {
    selectAppointment(appointment, 'reschedule');
    setIsRescheduleModalOpen(true);
  };

  const handleCloseRescheduleModal = () => {
    setIsRescheduleModalOpen(false);
    clearSelection();
  };

  const handleOpenCheckinModal = (appointment: ReadAgendamentoDto) => {
    selectAppointment(appointment, 'checkin');
    setIsCheckinModalOpen(true);
  };

  const handleCloseCheckinModal = () => {
    setIsCheckinModalOpen(false);
    clearSelection();
  };

  const handleOpenCancelModal = (appointment: ReadAgendamentoDto) => {
    selectAppointment(appointment, 'cancel');
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    clearSelection();
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(appointment => {
    if (!searchQuery) return true;
    
    const patientName = appointment.Paciente?.nome_paciente?.toLowerCase() || '';
    const appointmentType = appointment.tipo_agendamento?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    return patientName.includes(query) || appointmentType.includes(query);
  });

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredAppointments.map((appointment: ReadAgendamentoDto) => (
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
                            isDisabled={isRescheduling || isCheckingIn || isCanceling}
                            aria-label="Check-in"
                          >
                            <CheckCircleIcon className="h-[18px] w-[18px]" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="default"
                            onClick={() => handleOpenRescheduleModal(appointment)}
                            isDisabled={isRescheduling || isCheckingIn || isCanceling}
                            aria-label="Reagendar"
                          >
                            <ClockIcon className="h-[18px] w-[18px]" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onClick={() => handleOpenCancelModal(appointment)}
                            isDisabled={isRescheduling || isCheckingIn || isCanceling}
                            aria-label="Cancelar"
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
        isOpen={isRescheduleModalOpen}
        onOpenChange={setIsRescheduleModalOpen}
        onClose={handleCloseRescheduleModal}
        appointment={selectedAppointment}
        formData={formData}
        onSubmit={rescheduleAppointment}
        onChange={handleChange}
        isLoading={isRescheduling}
      />

      <CheckinModal
        isOpen={isCheckinModalOpen}
        onOpenChange={setIsCheckinModalOpen}
        onClose={handleCloseCheckinModal}
        appointment={selectedAppointment}
        onConfirm={checkInAppointment}
        isLoading={isCheckingIn}
      />

      <CancelModal
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onClose={handleCloseCancelModal}
        appointment={selectedAppointment}
        onConfirm={cancelAppointment}
        isLoading={isCanceling}
      />
    </>
  );
}
