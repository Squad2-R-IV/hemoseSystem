import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip } from "@heroui/react";
import { ArrowRightEndOnRectangleIcon, PlayIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useUpdateConsultaMutation } from "~/services/siahme-api.service";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { SortDescriptor } from "@heroui/react";
import type { Key } from "@react-types/shared";
import { useNavigate } from "react-router";

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
  const pages = Math.ceil(items.length / rowsPerPage);
  const paginatedItems = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const navigate = useNavigate();

  const getCustomKeyValue = (item: ReadAgendamentoDto, columnKey: Key) => {
    switch (columnKey) {
      case "Paciente.nome_paciente":
        return item.Paciente?.nome_paciente || "N/A";
      case "Usuario.nome_usuario":
        return item.Usuario?.name || "N/A";
      case "data_hora_agendamento":
        try {
          return new Date(item.data_hora_agendamento).toLocaleString();
        } catch (e) {
          return item.data_hora_agendamento;
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
      <h3 className="text-lg font-semibold">Pacientes Aguardando/Chamados</h3>
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

      {items.length > 0 && (
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
