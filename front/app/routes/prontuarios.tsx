import Pacientes from "~/pages/pacientes/pacientes";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Prontuários" },
    { name: "description", content: "Prontuários dos pacientes." },
  ];
}

export default function ProntuariosRoute() {
  return <Pacientes />;
}
