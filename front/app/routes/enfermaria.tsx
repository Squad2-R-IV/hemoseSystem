import React from "react";
import { TabelaEnfermaria } from "~/components/enfermaria/TabelaEnfermaria";
import { useGetAgendamentosNaEnfermariaQuery } from "~/services/siahme-api.service";
import type { SortDescriptor } from "@heroui/react";
import { Spinner, Card, CardHeader } from "@heroui/react";
import type { Route } from "./+types/enfermaria";

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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enfermaria" },
    { name: "description", content: "Pacientes em atendimento na enfermaria." },
  ];
}

function EnfermariaPage() {
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id_paciente",
    direction: "ascending",
  });

  const rowsPerPage = 4;

  const { data: agendamentos = [], isLoading: isAgendamentosLoading } = useGetAgendamentosNaEnfermariaQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  if (isAgendamentosLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header for the page */}
      <Card>
        <CardHeader className="text-xl font-bold text-center">
          Enfermaria - Pacientes em Atendimento
        </CardHeader>
      </Card>
      
      <div className="flex flex-col gap-6">
        <TabelaEnfermaria
          items={agendamentos}
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

export default EnfermariaPage;
