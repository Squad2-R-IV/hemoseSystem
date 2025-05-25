import { useState, useMemo } from 'react';

interface UseGenericFilterProps<T> {
  data: T[];
  searchableFields?: (keyof T)[];
}

export function useGenericFilter<T extends Record<string, any>>({
  data,
  searchableFields
}: UseGenericFilterProps<T>) {
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const filteredData = useMemo(() => {
    if (!selectedColumn || !filterValue.trim()) {
      return data;
    }

    return data.filter((item) => {
      const columnValue = item[selectedColumn];
      if (columnValue == null) return false;
      
      return String(columnValue)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  }, [data, selectedColumn, filterValue]);

  const resetFilter = () => {
    setSelectedColumn('');
    setFilterValue('');
  };

  return {
    selectedColumn,
    filterValue,
    filteredData,
    setSelectedColumn,
    setFilterValue,
    resetFilter
  };
}
