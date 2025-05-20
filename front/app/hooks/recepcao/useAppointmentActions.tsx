import { useState } from "react";
import { StatusAgendamentoEnum, status_consulta_enum, tipo_procedimento_enum } from "~/utils/enums/enums";
import { 
  useUpdateAgendamentoMutation, 
  useReagendarAgendamentoMutation,
  useRealizarCheckinMutation
} from "~/services/siahme-api.service";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { UpdateAgendamentoDto } from "~/Dtos/Agendamento/UpdateAgendamentoDto";
import type { CreateAgendamentoDto } from "~/Dtos/Agendamento/CreateAgendamentoDto";
import type { CreateConsultaDto } from "~/Dtos/Consulta/CreateConsultaDto";
import { useApiErrorHandler } from '~/hooks/useApiErrorHandler';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface UseAppointmentActionsProps {
  onAppointmentUpdated?: () => void;
  refetchAppointments?: () => void;
}

export function useAppointmentActions({ 
  onAppointmentUpdated, 
  refetchAppointments 
}: UseAppointmentActionsProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<ReadAgendamentoDto | null>(null);
  const [formData, setFormData] = useState<Partial<ReadAgendamentoDto>>({});
  
  // Usando o nosso novo hook de tratamento de erros
  const { showSuccess, handleApiErrorWithTitle, handleCustomError } = useApiErrorHandler();

  // API hooks
  const [updateAgendamento, { isLoading: isCanceling }] = useUpdateAgendamentoMutation();
  const [reagendarAgendamento, { isLoading: isRescheduling }] = useReagendarAgendamentoMutation();
  const [realizarCheckin, { isLoading: isCheckingIn }] = useRealizarCheckinMutation();

  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper for triggering data refresh 
  const refreshData = () => {
    if (onAppointmentUpdated) {
      onAppointmentUpdated();
    } else if (refetchAppointments) {
      refetchAppointments();
    }
  };

  // Handle appointment selection for different operations
  const selectAppointment = (appointment: ReadAgendamentoDto, operation: 'reschedule' | 'checkin' | 'cancel') => {
    setSelectedAppointment(appointment);
    
    if (operation === 'reschedule') {
      // Prepare form data for rescheduling
      setFormData({
        dt_agendamento: appointment.dt_agendamento,
        dt_hora_agendamento: appointment.dt_hora_agendamento,
      });
    } else {
      // Reset form data for other operations
      setFormData({});
    }
  };

  const clearSelection = () => {
    setSelectedAppointment(null);
    setFormData({});
  };

  // Reschedule operation
  const rescheduleAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      // Create update DTO
      const updateDto: UpdateAgendamentoDto = {
        dt_agendamento: selectedAppointment.dt_agendamento,
        dt_hora_agendamento: selectedAppointment.dt_hora_agendamento,
        status_agendamento: StatusAgendamentoEnum.Reagendado,
        tipo_agendamento: selectedAppointment.tipo_agendamento,
        observacoes: selectedAppointment.observacoes
      };
        // Formatar data para o formato ISO com horário 00:00:00.000Z
  const formatDateToISO = (date?: Date) => {
    if (!date) return null; // Retornar null se a data for indefinida
    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0); // Garantir horário 00:00:00.000Z
    return formattedDate; // Retornar como objeto Date
  };
      // Create new appointment DTO
      const newAppointmentDto: CreateAgendamentoDto = {
        id_paciente: selectedAppointment.id_paciente,
        id_funcionario: selectedAppointment.id_funcionario,
        dt_agendamento: formatDateToISO(formData.dt_agendamento as Date)!, // Garantir que seja um objeto Date
        dt_hora_agendamento: Number(formData.dt_hora_agendamento),
        tipo_agendamento: selectedAppointment.tipo_agendamento,
        status_agendamento: StatusAgendamentoEnum.Agendado,
        observacoes: `Reagendado de ${new Date(selectedAppointment.dt_agendamento).toLocaleDateString()} ${selectedAppointment.dt_hora_agendamento}:00`
      };


      // Call rescheduling endpoint
      await reagendarAgendamento({
        id: selectedAppointment.id,
        updateDto,
        newAppointmentDto
      }).unwrap();

      showSuccess("Agendamento reagendado com sucesso!");
      
      refreshData();
      clearSelection();
      
      return true;
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      // Usando handleCustomError que aceita qualquer tipo de erro
      handleCustomError(
        error, 
        "Erro ao Reagendar",
        "Não foi possível reagendar o agendamento. Tente novamente."
      );
      
      return false;
    }
  };

  // Check-in operation
  const checkInAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      const currentDateTime = new Date();
      
      // Create update DTO for appointment
      const updateDto: UpdateAgendamentoDto = {
        dt_agendamento: selectedAppointment.dt_agendamento,
        dt_hora_agendamento: selectedAppointment.dt_hora_agendamento,
        tipo_agendamento: selectedAppointment.tipo_agendamento,
        status_agendamento: StatusAgendamentoEnum.Confirmado,
        dt_chegada: currentDateTime,
        observacoes: selectedAppointment.observacoes
      };
      
      // Create an initial consultation record
      const createConsultaDto: CreateConsultaDto = {
        id_agendamento: selectedAppointment.id,
        procedimento: tipo_procedimento_enum.PROCEDIMENTO_A,
        dt_entrada: currentDateTime,
        status: status_consulta_enum.AGUARDANDO,
        observacoes: "Consulta criada automaticamente pelo check-in"
      };

      // Use the combined mutation
      await realizarCheckin({
        id: selectedAppointment.id,
        updateDto,
        createConsultaDto
      }).unwrap();

      showSuccess("Check-in realizado com sucesso!");
      
      refreshData();
      clearSelection();
      
      return true;
    } catch (error) {
      console.error("Error checking in:", error);
      // Usando handleCustomError que aceita qualquer tipo de erro
      handleCustomError(
        error, 
        "Erro ao Realizar Check-in",
        "Não foi possível realizar o check-in. Tente novamente."
      );
      
      return false;
    }
  };

  // Cancel operation
  const cancelAppointment = async () => {
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

      showSuccess("Agendamento cancelado com sucesso!");
      
      refreshData();
      clearSelection();
      
      return true;
    } catch (error) {
      console.error("Error canceling appointment:", error);
      // Usando handleCustomError que aceita qualquer tipo de erro
      handleCustomError(
        error, 
        "Erro ao Cancelar Agendamento",
        "Não foi possível cancelar o agendamento. Tente novamente."
      );
      
      return false;
    }
  };

  // Helper function to determine if actions should be available
  const canPerformActions = (status: string): boolean => {
    return status === StatusAgendamentoEnum.Agendado;
  };

  return {
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
  };
}
