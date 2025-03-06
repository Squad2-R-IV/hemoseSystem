import type { Route } from "../../+types/home";
import { AtendimentoGeral } from "../../../pages/modulos/atendimento-geral/atendimento-geral";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Atendimento Geral" },
    {
      name: "description",
      content: "Bem-vindo ao módulo de Atendimento Geral!",
    },
  ];
}

export default function AtendimentoGeralRoute() {
  return <AtendimentoGeral />;
}
