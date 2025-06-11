import React from "react";
import FeatureCard from "~/components/home/FeatureCard";
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  FolderOpenIcon,
  UsersIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  useGetAgendamentosByDateQuery,
  useGetAgendamentosComConsultasAtivasQuery,
  useGetAgendamentosNaEnfermariaQuery,
} from "~/services/siahme-api.service";
import {
  StatusAgendamentoEnum,
  status_consulta_enum,
} from "~/utils/enums/enums";

export function Home() {
  const today = new Date().toISOString().split("T")[0];
  const { data: todaysAppointments = [] } = useGetAgendamentosByDateQuery({
    date: today,
  });
  const { data: activeAppointments = [] } =
    useGetAgendamentosComConsultasAtivasQuery();
  const { data: enfermariaAppointments = [] } =
    useGetAgendamentosNaEnfermariaQuery();

  const recepcaoTotal = React.useMemo(
    () =>
      todaysAppointments.filter(
        (a) =>
          a.status_agendamento !== StatusAgendamentoEnum.Cancelado &&
          a.status_agendamento !== StatusAgendamentoEnum.Reagendado &&
          a.status_agendamento !== StatusAgendamentoEnum.Realizado
      ).length,
    [todaysAppointments]
  );

  const waitingConsultas = React.useMemo(
    () =>
      activeAppointments.filter(
        (a) =>
          a.Consulta &&
          (a.Consulta.status === status_consulta_enum.AGUARDANDO ||
            a.Consulta.status === status_consulta_enum.CHAMADO)
      ).length,
    [activeAppointments]
  );

  const inProgressConsultas = React.useMemo(
    () =>
      activeAppointments.filter(
        (a) =>
          a.Consulta && a.Consulta.status === status_consulta_enum.EM_ATENDIMENTO
      ).length,
    [activeAppointments]
  );

  const aguardandoAcolhimento = React.useMemo(
    () =>
      enfermariaAppointments.filter(
        (a) =>
          a.Consulta &&
          a.Consulta.status === status_consulta_enum.AGUARDANDO_ACOLHIMENTO
      ).length,
    [enfermariaAppointments]
  );

  const naEnfermaria = React.useMemo(
    () =>
      enfermariaAppointments.filter(
        (a) =>
          a.Consulta && a.Consulta.status === status_consulta_enum.ENFERMARIA
      ).length,
    [enfermariaAppointments]
  );
  const features = [
    {
      title: "Recepção",
      description: "Agendamentos e cadastro de pacientes",
      icon: CalendarDaysIcon,
      path: "/recepcao",
      metrics: [
        { label: "Agendamentos hoje", value: recepcaoTotal },
      ],
    },
    {
      title: "Consultas",
      description: "Gerencie pacientes em atendimento",
      icon: ClipboardDocumentListIcon,
      path: "/selecao-agendamento",
      metrics: [
        { label: "Aguardando", value: waitingConsultas },
        { label: "Em atendimento", value: inProgressConsultas },
      ],
    },
    {
      title: "Enfermaria",
      description: "Controle de pacientes internados",
      icon: UsersIcon,
      path: "/enfermaria",
      metrics: [
        { label: "Aguard. acolhimento", value: aguardandoAcolhimento },
        { label: "Na enfermaria", value: naEnfermaria },
      ],
    },
    {
      title: "Prontuários",
      description: "Histórico médico dos pacientes",
      icon: FolderOpenIcon,
      path: "/prontuarios",
    },
    {
      title: "Funcionários",
      description: "Cadastro e permissões",
      icon: UserGroupIcon,
      path: "/funcionarios",
    },
    {
      title: "Permissões",
      description: "Gerencie roles e permissões",
      icon: ShieldCheckIcon,
      path: "/admin/permissions",
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao HemoseSystem</h1>
        <p className="text-gray-600">Selecione um módulo para começar</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}
