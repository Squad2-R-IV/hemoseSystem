import { Badge, Chip } from "@heroui/react";
import React from "react";
import type { status_exame_enum } from "./enums/enums";

/**
 * Utility functions for handling status display with consistent colors and styles
 */

/**
 * Get color for consultation/appointment status
 */
export function getStatusColor(status: string): "default" | "primary" | "secondary" | "success" | "warning" | "danger" {
  switch (status) {
    case 'AGUARDANDO':
      return 'warning';
    case 'EM_ATENDIMENTO':
      return 'primary';
    case 'CHAMADO':
      return 'secondary';
    case 'FINALIZADO':
    case 'REALIZADO':
      return 'success';
    case 'CANCELADO':
      return 'danger';
    default:
      return 'default';
  }
}

/**
 * Get color for appointment status (Agendamento)
 */
export function getAppointmentStatusColor(status: string): "default" | "primary" | "secondary" | "success" | "warning" | "danger" {
  switch (status) {
    case 'Agendado':
      return 'warning';
    case 'Confirmado':
      return 'success';
    case 'Realizado':
      return 'success';
    case 'Cancelado':
      return 'danger';
    case 'Reagendado':
      return 'primary';
    default:
      return 'default';
  }
}

/**
 * Get color for exam status
 */
export function getExamStatusColor(status: status_exame_enum): "default" | "primary" | "secondary" | "success" | "warning" | "danger" {
  switch (status) {
    case 'PENDENTE':
      return 'warning';
    case 'REALIZADO':
      return 'success';
    default:
      return 'default';
  }
}

/**
 * Render a status chip with appropriate color
 */
export function getStatusChip(status: string): React.ReactElement {
  const color = getStatusColor(status);
  
  return (
    <Chip variant="flat" color={color}>
      {status}
    </Chip>
  );
}

/**
 * Render an appointment status badge with appropriate color
 */
export function getAppointmentStatusChip(status: string): React.ReactElement {
  const color = getAppointmentStatusColor(status);
  
  return (
    <Chip color={color} variant="flat">
      {status}
    </Chip>
  );
}

/**
 * Render an exam status chip with appropriate color
 */
export function getExamStatusChip(status: status_exame_enum): React.ReactElement {
  const color = getExamStatusColor(status);
  
  return (
    <Chip variant="flat" color={color}>
      {status}
    </Chip>
  );
}

/**
 * Render a generic status chip with custom color mapping
 */
export function getCustomStatusChip(
  status: string, 
  colorMap?: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger">
): React.ReactElement {
  const color = colorMap?.[status] || getStatusColor(status);
  
  return (
    <Chip variant="flat" color={color}>
      {status}
    </Chip>
  );
}

/**
 * Render a generic status badge with custom color mapping
 */
export function getCustomStatusBadge(
  status: string, 
  colorMap?: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger">
): React.ReactElement {
  const color = colorMap?.[status] || getAppointmentStatusColor(status);
  
  return (
    <Badge color={color} variant="flat">
      {status}
    </Badge>
  );
}
