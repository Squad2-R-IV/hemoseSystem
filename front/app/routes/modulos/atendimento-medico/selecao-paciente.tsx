import type { Route } from "../../+types/home";
import { SelecaoPaciente } from "../../../pages/modulos/atendimento-medico/selecao-paciente";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Atendimento Médico" },
    {
      name: "description",
      content: "Bem-vindo ao módulo de Atendimento Médico!",
    },
  ];
}

export default function SelecaoAgendamentoRoute() {
  return <SelecaoPaciente />;
}
