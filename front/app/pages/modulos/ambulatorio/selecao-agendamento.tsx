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

    return [waitingAndCalled, inProgress];
  }, [agendamentos]);

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
