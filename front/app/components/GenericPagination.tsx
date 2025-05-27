import React from 'react';
import { Pagination } from '@heroui/react';

interface GenericPaginationProps {
  totalItems: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  showControls?: boolean;
  showShadow?: boolean;
  className?: string;
}

export const GenericPagination: React.FC<GenericPaginationProps> = ({
  totalItems,
  currentPage,
  rowsPerPage,
  onPageChange,
  color = "primary",
  showControls = true,
  showShadow = true,
  className = ""
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  if (totalItems <= rowsPerPage) {
    return null;
  }

  return (
    <div className={`flex justify-center p-4 ${className}`}>
      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color={color}
        showControls={showControls}
        showShadow={showShadow}
      />
    </div>
  );
};
