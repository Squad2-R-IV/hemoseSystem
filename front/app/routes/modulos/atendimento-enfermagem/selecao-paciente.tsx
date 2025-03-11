import type { Route } from "../../+types/home";
import { SelecaoPaciente } from "../../../pages/modulos/atendimento-enfermagem/selecao-paciente";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Atendimento Enfermagem" },
    {
      name: "description",
      content: "Bem-vindo ao módulo de Enfermagem!",
    },
  ];
}

export default function SelecaoPacienteRoute() {
  return <SelecaoPaciente />;
}
