import { Button, Card, CardBody, Input, Pagination, Select, SelectItem, Chip } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TabelaAguardandoChamados } from "~/components/ambulatorio/TabelaAguardandoChamados";
import { TabelaEmAtendimento } from "~/components/ambulatorio/TabelaEmAtendimento";
import { useUpdateConsultaMutation } from "~/services/siahme-api.service";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  type SortDescriptor
} from "@heroui/react";
import React from "react";
import { useGetAgendamentosComConsultasAtivasQuery } from "~/services/siahme-api.service";
import type { ReadConsultaDto } from "~/Dtos copy/Consulta/ReadConsultaDto";
import type { ReadAgendamentoDto } from "~/Dtos copy/Agendamento/ReadAgendamentoDto";
import type { Key } from "@react-types/shared";

var StatusAgendamentoEnum = {
  Agendado: "Agendado",
  Confirmado: "Confirmado",
  Realizado: "Realizado",
  Cancelado: "Cancelado",
  Reagendado: "Reagendado",
}

const columns = [
  {
    key: "Paciente.nome_paciente",
    label: "PACIENTE",
    sortable: true,
  },
  {
    key: "Usuario.nome_usuario",
    label: "FUNCIONÁRIO",
    sortable: true,
  },
  {
    key: "data_hora_agendamento",
    label: "DATA/HORA",
    sortable: true,
  },
  {
    key: "tipo_agendamento",
    label: "TIPO",
    sortable: true,
  },
  {
    key: "status_agendamento",
    label: "STATUS",
    sortable: true,
  },
  {
    key: "actions",
    label: "AÇÕES",
    sortable: false,
  },
];

export function SelecaoAgendamento() {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id_paciente",
    direction: "ascending",
  });
  const [selectedStatus, setSelectedStatus] = React.useState("");

  const rowsPerPage = 4;

  const { data: agendamentos = [], isLoading: isAgendamentosLoading } = useGetAgendamentosComConsultasAtivasQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  const [waitingAndCalledItems, inProgressItems] = React.useMemo(() => {
    const waitingAndCalled = [...agendamentos].filter(agendamento => 
      agendamento.Consulta && 
      (agendamento.Consulta.status === 'AGUARDANDO' || 
       agendamento.Consulta.status === 'CHAMADO')
    );

    const inProgress = [...agendamentos].filter(agendamento => 
      agendamento.Consulta && 
      agendamento.Consulta.status === 'EM_ATENDIMENTO'
    );

    const applyFilters = (items: ReadAgendamentoDto[]) => {
      let filtered = [...items];

      if (filterValue) {
        filtered = filtered.filter((item) =>
          item.Paciente?.nome_paciente?.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.id_paciente.toString().includes(filterValue)
        );
      }

      if (selectedStatus) {
        filtered = filtered.filter((item) => item.status_agendamento === selectedStatus);
      }

      if (sortDescriptor.column) {
        filtered.sort((a, b) => {
          let first, second;

          if (sortDescriptor.column.toString().includes('.')) {
            const parts = sortDescriptor.column.toString().split('.');
            first = (a[parts[0] as keyof typeof a] as any)?.[parts[1]] ?? '';
            second = (b[parts[0] as keyof typeof b] as any)?.[parts[1]] ?? '';
          } else {
            first = a[sortDescriptor.column as keyof typeof a] ?? '';
            second = b[sortDescriptor.column as keyof typeof b] ?? '';
          }

          const cmp = first < second ? -1 : first > second ? 1 : 0;
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }

      return filtered;
    };

    return [
      applyFilters(waitingAndCalled),
      applyFilters(inProgress)
    ];
  }, [filterValue, selectedStatus, sortDescriptor, agendamentos]);

  const waitingPages = Math.ceil(waitingAndCalledItems.length / rowsPerPage);
  const inProgressPages = Math.ceil(inProgressItems.length / rowsPerPage);
  
  const waitingItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return waitingAndCalledItems
      .filter(item => item.id_paciente !== undefined && item.id_paciente !== null)
      .slice(start, end);
  }, [page, waitingAndCalledItems]);

  const inProgressItemsPaginated = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return inProgressItems
      .filter(item => item.id_paciente !== undefined && item.id_paciente !== null)
      .slice(start, end);
  }, [page, inProgressItems]);

  const onSearchChange = React.useCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const getCustomKeyValue = (item: ReadAgendamentoDto, columnKey: Key) => {
    switch (columnKey) {
      case "id_paciente":
        return item.id_paciente;
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
          case 'AGUARDANDO':
            color = "warning";
            break;
          case 'EM_ATENDIMENTO':
            color = "primary";
            break;
          case 'CHAMADO':
            color = "secondary";
            break;
          case 'FINALIZADO':
            color = "success";
            break;
          case 'CANCELADO':
            color = "danger";
            break;
          default:
            color = "default";
        }
        return <Chip variant="flat" color={color}>{status}</Chip>;
      default:
        return "";
    }
  };

  const [updateConsulta, { isLoading: isUpdating }] = useUpdateConsultaMutation();

  if (isAgendamentosLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardBody className="flex flex-row gap-4">
          <Input
            placeholder="Busca por nome do paciente ou id do paciente"
            label="Buscar"
            type="text"
            startContent={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Select
            className="max-w-xs"
            label="Filtrar por Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <>
              <SelectItem key="all">Todos</SelectItem>
              {Object.values(StatusAgendamentoEnum).map((status) => (
                <SelectItem key={status}>{status}</SelectItem>
              ))}
            </>
          </Select>
        </CardBody>
      </Card>

      <div className="flex flex-col gap-6">
        <TabelaAguardandoChamados
          items={waitingAndCalledItems}
          page={page}
          setPage={setPage}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
          isUpdating={isUpdating}
          updateConsulta={updateConsulta}
          columns={columns}
          rowsPerPage={rowsPerPage}
        />

        <TabelaEmAtendimento
          items={inProgressItems}
          page={page}
          setPage={setPage}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
          columns={columns}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}
