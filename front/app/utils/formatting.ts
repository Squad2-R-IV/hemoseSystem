import type { DateValue } from "@internationalized/date";

/**
 * Utility functions for formatting data consistently across the application
 */

/**
 * Format a date for display in the UI (Brazilian format)
 */
export function formatDate(date: Date | string | DateValue | undefined): string {
  if (!date) return "-";
  
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    // DateValue type
    dateObj = new Date(date.toString());
  }
  
  return dateObj.toLocaleDateString('pt-BR');
}

/**
 * Format a date and time for display in the UI (Brazilian format)
 */
export function formatDateTime(date: Date | string | undefined): string {
  if (!date) return "-";
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "Data inválida";
    }
    return dateObj.toLocaleString('pt-BR');
  } catch (e) {
    return "Data inválida";
  }
}

/**
 * Format a date and time for table display (shorter format)
 */
export function formatDateTimeShort(date: Date | string | undefined): string {
  if (!date) return "Data não definida";
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "Data inválida";
    }
    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return date?.toString() || "Data inválida";
  }
}

/**
 * Format a date for use in input elements (YYYY-MM-DD format)
 */
export function formatDateForInput(date: Date | string | undefined): string {
  if (!date) return "";
  
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Format a DateValue for API calls
 */
export function formatDateForApi(date: DateValue | undefined): string {
  if (!date) return new Date().toISOString().split("T")[0];
  return new Date(date.toString()).toISOString().split("T")[0];
}

/**
 * Format time for display (Brazilian format HH:MM)
 */
export function formatTime(date: Date | string | undefined): string {
  if (!date) return "-";
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "Hora inválida";
    }
    return dateObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return "Hora inválida";
  }
}

/**
 * Format sex/gender for display
 */
export function formatSex(sex: string): string {
  switch (sex) {
    case 'M':
      return 'Masculino';
    case 'F':
      return 'Feminino';
    case 'O':
      return 'Outro';
    default:
      return 'Não informado';
  }
}

/**
 * Format marital status for display
 */
export function formatEstadoCivil(estadoCivil: string): string {
  switch (estadoCivil) {
    case 'S':
      return 'Solteiro(a)';
    case 'C':
      return 'Casado(a)';
    case 'D':
      return 'Divorciado(a)';
    case 'V':
      return 'Viúvo(a)';
    default:
      return 'Não informado';
  }
}

/**
 * Format an hour number to a display string
 */
export function formatHour(hour: number): string {
  return `${hour.toString().padStart(2, '0')}:00`;
}

/**
 * Generate an array of available hours (6:00 - 18:00)
 */
export function getAvailableHours(): number[] {
  return Array.from({ length: 13 }, (_, i) => i + 6);
}

/**
 * Format a DateValue for detailed display (includes weekday and long format)
 */
export function formatDateDetailed(date: DateValue | undefined): string {
  if (!date) return "";
  return new Date(date.toString()).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a DateValue for API calls (YYYY-MM-DD format)
 */
export function formatDateValueForApi(date: DateValue | undefined): string {
  if (!date) return new Date().toISOString().split("T")[0];
  return new Date(date.toString()).toISOString().split("T")[0];
}
