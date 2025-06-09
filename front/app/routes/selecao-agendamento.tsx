import type { Route } from "./+types/home";
import { SelecaoAgendamento } from "../pages/modulos/ambulatorio/selecao-agendamento";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Atendimento Enfermagem" },
    {
      name: "description",
      content: "Bem-vindo ao módulo de Enfermagem!",
    },
  ];
}

export default function SelecaoAgendamentoRoute() {
  return <SelecaoAgendamento />;
}
