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
import type { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { Key } from "@react-types/shared";
import { getStatusChip } from "~/utils/status";
import { formatDateTimeShort } from "~/utils/formatting";

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
    key: "dt_chegada",
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
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id_paciente",
    direction: "ascending",
  });

  const rowsPerPage = 4;

  const { data: agendamentos = [], isLoading: isAgendamentosLoading, refetch } = useGetAgendamentosComConsultasAtivasQuery(undefined, {
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

    return [waitingAndCalled, inProgress];
  }, [agendamentos]);

  const getCustomKeyValue = (item: ReadAgendamentoDto, columnKey: Key) => {
    switch (columnKey) {
      case "id_paciente":
        return item.id_paciente;
      case "Paciente.nome_paciente":
        return item.Paciente?.nome_paciente || "N/A";
      case "Usuario.nome_usuario":
        return item.Usuario?.name || "N/A";      case "data_hora_agendamento":
        return formatDateTimeShort(item.dt_chegada);
      case "tipo_agendamento":
        return item.tipo_agendamento;      case "status_agendamento":
        // Se o agendamento está cancelado, sempre mostrar "Cancelado"
        // caso contrário, mostrar o status da consulta ou do agendamento
        const status = item.status_agendamento === 'Cancelado' 
          ? 'Cancelado' 
          : (item.Consulta?.status || item.status_agendamento);
        return getStatusChip(status);
      default:
        return "";
    }
  };

  const [updateConsulta, { isLoading: isUpdating }] = useUpdateConsultaMutation();

  if (isAgendamentosLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <TabelaAguardandoChamados
          items={waitingAndCalledItems}
          page={page}
          setPage={setPage}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
          isUpdating={isUpdating}
          updateConsulta={updateConsulta}
          refetch={refetch}
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
