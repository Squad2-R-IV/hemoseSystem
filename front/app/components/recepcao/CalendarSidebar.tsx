import React from "react";
import { Calendar } from "@heroui/react";
import type { DateValue } from "@internationalized/date";

interface CalendarSidebarProps {
  selectedDate: DateValue;
  onDateChange: (date: DateValue) => void;
}

export function CalendarSidebar({ selectedDate, onDateChange }: CalendarSidebarProps) {
  return (
    <div className="w-80 border-l p-6 bg-gray-50">
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Calendário</h2>
        <Calendar
          aria-label="Calendário de agendamentos"
          value={selectedDate}
          onChange={onDateChange}
        />
      </div>
    </div>
  );
}
