import type { DateValue } from "@internationalized/date";

// Format date for display
export const formatDate = (date: DateValue): string => {
  const d = new Date(date.year, date.month - 1, date.day);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

// Format date for API calls in YYYY-MM-DD format
export const formatDateForApi = (date: DateValue): string => {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
};
