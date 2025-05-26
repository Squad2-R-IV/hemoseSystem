import { useNavigate } from 'react-router';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Card, CardHeader, CardBody, Link } from "@heroui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { SortDescriptor } from "@heroui/react";
import type { Key } from "@react-types/shared";
import { GenericFilter } from "~/components/GenericFilter";
import React from 'react';

interface TabelaEmAtendimentoProps {
  items: ReadAgendamentoDto[];
  page: number;
  setPage: (page: number) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (sort: SortDescriptor) => void;
  columns: {
    key: string;
    label: string;
    sortable: boolean;
  }[];
  rowsPerPage: number;
}

export function TabelaEmAtendimento({
  items,
  page,
  setPage,
  sortDescriptor,
  setSortDescriptor,
  columns,
  rowsPerPage
}: TabelaEmAtendimentoProps) {
  const navigate = useNavigate();
  const [filterColumn, setFilterColumn] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");

  const filterColumns = [
    { key: "Paciente.nome_paciente", label: "Nome do Paciente" },
    { key: "Usuario.nome_usuario", label: "Funcionário" },
    { key: "tipo_agendamento", label: "Tipo de Agendamento" },
    { key: "status_agendamento", label: "Status" }
  ];

  const filteredItems = React.useMemo(() => {
    if (!filterColumn || !filterValue) return items;

    return items.filter((item) => {
      let value = "";

      switch (filterColumn) {
        case "Paciente.nome_paciente":
          value = item.Paciente?.nome_paciente || "";
          break;
        case "Usuario.nome_usuario":
          value = item.Usuario?.name || "";
          break;
        case "tipo_agendamento":
          value = item.tipo_agendamento || "";
          break;
        case "status_agendamento":
          value = item.Consulta?.status || item.status_agendamento || "";
          break;
        default:
          return true;
      }

      return value.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [items, filterColumn, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const paginatedItems = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const getCustomKeyValue = (item: ReadAgendamentoDto, columnKey: Key) => {
    switch (columnKey) {
      case "Paciente.nome_paciente":
        return (
          <Link 
            href={`/prontuarios/${item.id_paciente}`}
            color="primary"
            underline="hover"
          >
            {item.Paciente?.nome_paciente || "N/A"}
          </Link>
        );
      case "Usuario.nome_usuario":
        return item.Usuario?.name || "N/A";
      case "dt_chegada":
        try {
          return item.dt_chegada
            ? new Date(item.dt_chegada).toLocaleString()
            : "Data não definida";
        } catch (e) {
          return item.dt_chegada?.toString() || "Data inválida";
        }
      case "tipo_agendamento":
        return item.tipo_agendamento;
      case "status_agendamento":
        const status = item.Consulta?.status || item.status_agendamento;
        let color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" = "default";
        switch (status) {
          case 'AGUARDANDO': color = "warning"; break;
          case 'EM_ATENDIMENTO': color = "primary"; break;
          case 'CHAMADO': color = "secondary"; break;
          case 'FINALIZADO': color = "success"; break;
          case 'CANCELADO': color = "danger"; break;
          default: color = "default";
        }
        return <Chip variant="flat" color={color}>{status}</Chip>;
      default: return "";
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader className="text-lg font-semibold">

          Pacientes em Atendimento
        </CardHeader>
        <CardBody>
          <GenericFilter
            columns={filterColumns}
            selectedColumn={filterColumn}
            filterValue={filterValue}
            onColumnChange={setFilterColumn}
            onFilterChange={setFilterValue}
            placeholder="Digite para filtrar..."
          />
        </CardBody>
      </Card>

      <Table
        aria-label="Tabela de agendamentos - Em Atendimento"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedItems} emptyContent={"Nenhum paciente em atendimento"}>
          {(item) => (
            <TableRow key={item.id_paciente}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" && item.Consulta ? (
                    <Button
                      size="sm"
                      color="secondary"
                      variant="ghost"
                      startContent={<EyeIcon className="h-6 w-6" />}
                      onPress={() => item.Consulta && navigate(`/consulta/${item.Consulta.id}`)}
                    >
                      Visualizar
                    </Button>
                  ) : (
                    getCustomKeyValue(item, columnKey) as React.ReactNode
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {filteredItems.length > 0 && (
        <div className="flex justify-center">
          <Pagination
            total={pages}
            page={page}
            onChange={setPage}
            color="primary"
            showControls
            isDisabled={pages <= 1}
          />
        </div>
      )}
    </div>
  );
}
