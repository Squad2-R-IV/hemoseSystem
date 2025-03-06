import type { Route } from "../+types/home";
import { Recepcao } from "../../pages/modulos/recepcao";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Recepcao" },
    { name: "description", content: "Bem-vindo à tela de Cadastro!" },
  ];
}

export default function RecepcaoRoute() {
  return <Recepcao />;
}
