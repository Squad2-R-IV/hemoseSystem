import FeatureCard from "~/components/home/FeatureCard";
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  FolderOpenIcon,
  UsersIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export function Home() {
  const features = [
    {
      title: "Recepção",
      description: "Agendamentos e cadastro de pacientes",
      icon: CalendarDaysIcon,
      path: "/recepcao",
    },
    {
      title: "Consultas",
      description: "Gerencie pacientes em atendimento",
      icon: ClipboardDocumentListIcon,
      path: "/selecao-agendamento",
    },
    {
      title: "Prontuários",
      description: "Histórico médico dos pacientes",
      icon: FolderOpenIcon,
      path: "/prontuarios",
    },
    {
      title: "Enfermaria",
      description: "Controle de pacientes internados",
      icon: UsersIcon,
      path: "/enfermaria",
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
