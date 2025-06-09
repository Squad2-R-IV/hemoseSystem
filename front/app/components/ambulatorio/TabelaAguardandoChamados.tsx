import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Card, CardBody, CardHeader, addToast } from "@heroui/react";
import { ArrowRightEndOnRectangleIcon, PlayIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useUpdateConsultaMutation, useUpdateAgendamentoMutation } from "~/services/siahme-api.service";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { UpdateAgendamentoDto } from "~/Dtos/Agendamento/UpdateAgendamentoDto";
import { StatusAgendamentoEnum } from "~/utils/enums/enums";
import type { SortDescriptor } from "@heroui/react";
import type { Key } from "@react-types/shared";
import { Link, useNavigate } from "react-router";
import { GenericFilter } from "~/components/GenericFilter";
import { getStatusChip } from "~/utils/status";
import { formatDateTimeShort } from "~/utils/formatting";
import { NoShowModal } from "./NoShowModal";
import React from 'react';

interface TabelaAguardandoChamadosProps {
  items: ReadAgendamentoDto[];
  page: number;
  setPage: (page: number) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (sort: SortDescriptor) => void;
  isUpdating: boolean;
  updateConsulta: ReturnType<typeof useUpdateConsultaMutation>[0];
  refetch: () => void;
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
  refetch,
  columns,
  rowsPerPage
}: TabelaAguardandoChamadosProps) {
  const [filterColumn, setFilterColumn] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");

  const [selectedAgendamento, setSelectedAgendamento] = React.useState<ReadAgendamentoDto | null>(null);
  const [isNoShowModalOpen, setIsNoShowModalOpen] = React.useState(false);

  const [updateAgendamento, { isLoading: isUpdatingAgendamento }] = useUpdateAgendamentoMutation();

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

  const handleOpenNoShowModal = (agendamento: ReadAgendamentoDto) => {
    setSelectedAgendamento(agendamento);
    setIsNoShowModalOpen(true);
  };

  const handleCloseNoShowModal = () => {
    setIsNoShowModalOpen(false);
    setSelectedAgendamento(null);
  };

  const handleNoShowConfirm = async (): Promise<boolean | undefined> => {
    if (!selectedAgendamento) return false;

    const updateDto: UpdateAgendamentoDto = {
      dt_agendamento: selectedAgendamento.dt_agendamento,
      dt_hora_agendamento: selectedAgendamento.dt_hora_agendamento,
      tipo_agendamento: selectedAgendamento.tipo_agendamento,
      status_agendamento: StatusAgendamentoEnum.Cancelado,
      observacoes: selectedAgendamento.observacoes,
      dt_chegada: selectedAgendamento.dt_chegada,
    };

    try {
      await updateAgendamento({ id: selectedAgendamento.id, body: updateDto }).unwrap();

      addToast({
        title: "Sucesso!",
        description: "Ausência registrada com sucesso.",
        color: "success",
      });

      refetch();
      return true;
    } catch (error) {
      addToast({
        title: "Erro",
        description: "Não foi possível registrar ausência.",
        color: "danger",
      });
      return false;
    }
  };

  const getCustomKeyValue = (item: ReadAgendamentoDto, columnKey: Key) => {
    switch (columnKey) {
      case "Paciente.nome_paciente":
        return (
          <Link 
            to={`/prontuarios/${item.id_paciente}`}
            className="text-blue-600 hover:underline"
            viewTransition
          >
            {item.Paciente?.nome_paciente || "N/A"}
          </Link>
        );
      case "Usuario.nome_usuario":
        return item.Usuario?.name || "N/A";      case "dt_chegada":
        return formatDateTimeShort(item.dt_chegada);
      case "tipo_agendamento":
        return item.tipo_agendamento;      case "status_agendamento":
        const status = item.Consulta?.status || item.status_agendamento;
        return getStatusChip(status);
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
                    item.Consulta.status === 'CHAMADO' ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="success"
                          variant="ghost"
                          startContent={<PlayIcon className="h-6 w-6" />}
                          isLoading={isUpdating}
                          onPress={async () => {
                            await updateConsulta({
                              id: item.Consulta!.id,
                              body: { status: 'EM_ATENDIMENTO' }
                            });
                            navigate(`/consulta/${item.Consulta!.id}`, { viewTransition: true });
                          }}
                        >
                          Iniciar
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="ghost"
                          isLoading={isUpdatingAgendamento}
                          onPress={() => handleOpenNoShowModal(item)}
                        >
                          Não Presente
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        color={item.Consulta.status === 'AGUARDANDO' ? 'primary' : 'warning'}
                        variant="ghost"
                        startContent={<ArrowRightEndOnRectangleIcon className="h-6 w-6" />}
                        isLoading={isUpdating}
                        onPress={async () => {
                          if (item.Consulta?.status === 'AGUARDANDO') {
                            await updateConsulta({
                              id: item.Consulta.id,
                              body: { status: 'CHAMADO' }
                            });
                          }
                        }}
                      >
                        Chamar
                      </Button>
                    )
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
      <NoShowModal
        isOpen={isNoShowModalOpen}
        onOpenChange={setIsNoShowModalOpen}
        onClose={handleCloseNoShowModal}
        agendamento={selectedAgendamento}
        onConfirm={handleNoShowConfirm}
        isLoading={isUpdatingAgendamento}
      />
    </div>
  );
}
