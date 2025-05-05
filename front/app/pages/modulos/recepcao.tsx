import React, { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { UserIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import { CreatePacienteDto } from "~/Dtos/Paciente/CreatePacienteDto";
import { CreateAgendamentoDto } from "~/Dtos/Agendamento/CreateAgendamentoDto";
import { 
  useCreatePacienteMutation, 
  useCreateAgendamentoMutation,
  useGetAgendamentosByDateQuery 
} from "~/services/siahme-api.service";

// Import componentized modules
import { PacienteModal } from "../../components/recepcao/PacienteModal";
import { AgendamentoModal } from "../../components/recepcao/AgendamentoModal";
import { AppointmentsTable } from "../../components/recepcao/AppointmentsTable";
import { CalendarSidebar } from "../../components/recepcao/CalendarSidebar";
import { formatDateForApi } from "../../components/recepcao/utils";

export default function Recepcao() {
  const [selectedDate, setSelectedDate] = React.useState<DateValue>(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [isPacienteModalOpen, setPacienteModalOpen] = useState(false);
  const [isAgendamentoModalOpen, setAgendamentoModalOpen] = useState(false);
  const [createPaciente] = useCreatePacienteMutation();
  const [createAgendamento] = useCreateAgendamentoMutation();
  
  // Format the date for API call (YYYY-MM-DD)
  const formattedDate = formatDateForApi(selectedDate);
  
  // Fetch agendamentos for the selected date
  const { data: appointments = [], isLoading } = useGetAgendamentosByDateQuery({ 
    date: formattedDate 
  }, {
    // Re-fetch when coming back to the window/tab
    refetchOnMountOrArgChange: true
  });

  // Handle date change from calendar
  const handleDateChange = (date: DateValue): void => {
    setSelectedDate(date);
    // The query will automatically re-fetch when the dependency (formattedDate) changes
  };

  const handlePacienteSubmit = async (data: CreatePacienteDto) => {
    try {
      await createPaciente(data).unwrap();
      setPacienteModalOpen(false);
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  const handleAgendamentoSubmit = async (data: CreateAgendamentoDto) => {
    try {
      await createAgendamento(data).unwrap();
      setAgendamentoModalOpen(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Button
            color="primary"
            className="h-12"
            startContent={<UserIcon className="h-5 w-5" />}
            onClick={() => setPacienteModalOpen(true)}
          >
            Novo Paciente
          </Button>
          <Button
            color="success"
            className="h-12"
            startContent={<CalendarIcon className="h-5 w-5" />}
            onClick={() => setAgendamentoModalOpen(true)}
          >
            Novo Agendamento
          </Button>
        </div>

        {/* Appointments Table with Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <AppointmentsTable 
            selectedDate={selectedDate} 
            appointments={appointments} 
          />
        )}
      </div>

      {/* Calendar Sidebar */}
      <CalendarSidebar 
        selectedDate={selectedDate} 
        onDateChange={handleDateChange} 
      />

      {/* Modals */}
      {isPacienteModalOpen && (
        <PacienteModal
          onClose={() => setPacienteModalOpen(false)}
          onSubmit={handlePacienteSubmit}
        />
      )}
      {isAgendamentoModalOpen && (
        <AgendamentoModal
          onClose={() => setAgendamentoModalOpen(false)}
          onSubmit={handleAgendamentoSubmit}
        />
      )}
    </div>
  );
}