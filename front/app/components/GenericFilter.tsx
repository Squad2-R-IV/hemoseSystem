import React from 'react';
import { Input, Select, SelectItem } from '@heroui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FilterColumn {
  key: string;
  label: string;
}

interface GenericFilterProps {
  columns: FilterColumn[];
  selectedColumn: string;
  filterValue: string;
  onColumnChange: (column: string) => void;
  onFilterChange: (value: string) => void;
  placeholder?: string;
}

export const GenericFilter: React.FC<GenericFilterProps> = ({
  columns,
  selectedColumn,
  filterValue,
  onColumnChange,
  onFilterChange,
  placeholder = "Digite para filtrar..."
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <Select
        label="Filtrar por"
        size='sm'
        className='rounded-md'
        selectedKeys={selectedColumn ? [selectedColumn] : []}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          onColumnChange(selected);
        }}
      >
        {columns.map((column) => (
          <SelectItem key={column.key}>
            {column.label}
          </SelectItem>
        ))}
      </Select>
      
      <Input
        value={filterValue}
        onValueChange={onFilterChange}
        placeholder={placeholder}
        className='col-span-2 rounded-md'
        startContent={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
        size="lg"
        disabled={!selectedColumn}
      />
    </div>
  );
};
