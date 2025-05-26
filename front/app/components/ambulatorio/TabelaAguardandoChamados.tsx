import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Card, CardBody, CardHeader, Link } from "@heroui/react";
import { ArrowRightEndOnRectangleIcon, PlayIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useUpdateConsultaMutation } from "~/services/siahme-api.service";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { SortDescriptor } from "@heroui/react";
import type { Key } from "@react-types/shared";
import { useNavigate } from "react-router";
import { GenericFilter } from "~/components/GenericFilter";
import React from 'react';

interface TabelaAguardandoChamadosProps {
  items: ReadAgendamentoDto[];
  page: number;
  setPage: (page: number) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (sort: SortDescriptor) => void;
  isUpdating: boolean;
  updateConsulta: ReturnType<typeof useUpdateConsultaMutation>[0];
  columns: {
    key: string;
    label: string;
    sortable: boolean;
  }[];
  rowsPerPage: number;
}

export function TabelaAguardandoChamados({
  items,
  page,
  setPage,
  sortDescriptor,
  setSortDescriptor,
  isUpdating,
  updateConsulta,
  columns,
  rowsPerPage
}: TabelaAguardandoChamadosProps) {
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
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader className="text-lg font-semibold">

          Pacientes Aguardando/Chamados
        </CardHeader>
        <CardBody >
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
        aria-label="Tabela de agendamentos - Aguardando/Chamados"
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
        <TableBody
          items={paginatedItems}
          emptyContent={"Nenhum paciente aguardando ou chamado"}
        >
          {(item) => (
            <TableRow key={item.id_paciente}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" && item.Consulta ? (
                    <Button
                      size="sm"
                      color={
                        item.Consulta?.status === 'AGUARDANDO' ? 'primary' :
                          item.Consulta?.status === 'CHAMADO' ? 'success' :
                            'warning'
                      }
                      variant="ghost"
                      startContent={
                        item.Consulta?.status === 'AGUARDANDO' ?
                          <ArrowRightEndOnRectangleIcon className="h-6 w-6" /> :
                          item.Consulta?.status === 'CHAMADO' ?
                            <PlayIcon className="h-6 w-6" /> :
                            <PlayIcon className="h-6 w-6" />
                      }
                      isLoading={isUpdating}
                      onPress={async () => {
                        if (item.Consulta?.status === 'AGUARDANDO') {
                          await updateConsulta({
                            id: item.Consulta.id,
                            body: { status: 'CHAMADO' }
                          });
                        } else if (item.Consulta?.status === 'CHAMADO') {
                          await updateConsulta({
                            id: item.Consulta.id,
                            body: { status: 'EM_ATENDIMENTO' }
                          });
                          navigate(`/consulta/${item.Consulta.id}`);
                        }
                      }}
                    >
                      {item.Consulta?.status === 'AGUARDANDO' ? 'Chamar' :
                        item.Consulta?.status === 'CHAMADO' ? 'Iniciar' : ''}
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
