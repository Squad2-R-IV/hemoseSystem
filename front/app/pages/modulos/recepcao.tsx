import React, { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { UserIcon, CalendarIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import { useGetAgendamentosByDateQuery } from "~/services/siahme-api.service";

// Import componentized modules
import { PacienteModal } from "../../components/recepcao/PacienteModal";
import { AgendamentoModal } from "../../components/recepcao/AgendamentoModal";
import { ExamesModal } from "../../components/recepcao/ExamesModal";
import { AppointmentsTable } from "../../components/recepcao/AppointmentsTable";
import { CalendarSidebar } from "../../components/recepcao/CalendarSidebar";
import { formatDateForApi } from "../../utils/recepcao/utils";

export default function Recepcao() {
  const [selectedDate, setSelectedDate] = React.useState<DateValue>(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [isPacienteModalOpen, setPacienteModalOpen] = useState(false);
  const [isAgendamentoModalOpen, setAgendamentoModalOpen] = useState(false);
  const [isExameModalOpen, setExameModalOpen] = useState(false);

  // Format the date for API call (YYYY-MM-DD)
  const formattedDate = formatDateForApi(selectedDate);
  // Fetch agendamentos for the selected date
  const { data: appointments = [], isLoading, refetch } = useGetAgendamentosByDateQuery({
    date: formattedDate
  }, {
    // Re-fetch when coming back to the window/tab
    refetchOnMountOrArgChange: true
  });

  // Handle appointment updates
  const handleAppointmentUpdated = () => {
    // Refetch the appointments data when an appointment is updated
    refetch();
  };

  // Handle date change from calendar
  const handleDateChange = (date: DateValue): void => {
    setSelectedDate(date);
    // The query will automatically re-fetch when the dependency (formattedDate) changes
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
          </Button>          <Button
            color="warning"
            className="h-12"
            startContent={<BookOpenIcon className="h-5 w-5" />}
            onClick={() => setExameModalOpen(true)}
          >
            Cadastrar Exames
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
            onAppointmentUpdated={handleAppointmentUpdated}
          />
        )}
      </div>

      {/* Calendar Sidebar */}
      <CalendarSidebar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />      {/* Modals */}
      {isPacienteModalOpen && (
        <PacienteModal
          onClose={() => setPacienteModalOpen(false)}
        />
      )}
      {isAgendamentoModalOpen && (
        <AgendamentoModal
          onClose={() => setAgendamentoModalOpen(false)}
        />
      )}
      {isExameModalOpen && (
        <ExamesModal
          onClose={() => setExameModalOpen(false)}
        />
      )}
    </div>
  );
}