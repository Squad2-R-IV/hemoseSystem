import type { DateValue } from "@internationalized/date";

/**
 * Format a DateValue for display in the UI
 */
export function formatDate(date: DateValue | undefined): string {
  if (!date) return "";
  return new Date(date.toString()).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date for use in an input element
 */
export function formatDateForInput(date: Date | string | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

/**
 * Format a date for the API
 */
export function formatDateForApi(date: DateValue | undefined): string {
  if (!date) return new Date().toISOString().split("T")[0];
  return new Date(date.toString()).toISOString().split("T")[0];
}

/**
 * Format an hour number to a display string
 */
export function formatHour(hour: number): string {
  return `${hour}:00`;
}

/**
 * Generate an array of available hours (6:00 - 18:00)
 */
export function getAvailableHours(): number[] {
  return Array.from({ length: 13 }, (_, i) => i + 6);
}
