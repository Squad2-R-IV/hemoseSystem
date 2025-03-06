import type { Route } from "../../+types/home";
import { Paciente } from "../../../pages/modulos/atendimento-medico/paciente";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Paciente" },
    {
      name: "description",
      content: "Bem-vindo ao módulo de Atendimento Médico!",
    },
  ];
}

export default function PacienteRoute() {
  return <Paciente />;
}
