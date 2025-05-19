import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export interface Column {
  label: string;
  key: string;
}

export interface SearchModalProps {
  title: string;
  onClose: () => void;
  onSelect: (item: any) => void;
  useQuery: any;
  itemLabelKey: string;
  queryParams?: Record<string, unknown>;
  columns: Column[];
}

export function SearchModal({
  title,
  onClose,
  onSelect,
  useQuery,
  itemLabelKey,
  queryParams = {},
  columns,
}: SearchModalProps) {
  const { data, isLoading, error } = useQuery(queryParams);

  // Create columns array including the action column
  const allColumns = React.useMemo(() => {
    return [...columns, { key: "actions", label: "Ações" }];
  }, [columns]);

  // Type-safe render cell function
  const renderCell = React.useCallback(
    (item: Record<string, any>, columnKey: string) => {
      if (columnKey === "actions") {
        return (
          <Button
            size="sm"
            onPress={() => onSelect(item)}
            color="primary"
          >
            Selecionar
          </Button>
        );
      }
      return item[columnKey];
    },
    [onSelect]
  );

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <Table
              aria-label="Search results table"
              selectionMode="none"
            >
              <TableHeader columns={allColumns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={data ?? []}>
                {(item: Record<string, any>) => (
                  <TableRow key={item.id}>
                    {(columnKey: any) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
