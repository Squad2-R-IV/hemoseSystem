import type { Route } from "./+types/home";
import { Cadastro } from "app/pages/auth/cadastro/cadastro";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Cadastro" },
    { name: "description", content: "Bem-vindo à tela de Cadastro!" },
  ];
}

export default function CadastroRoute() {
  return <Cadastro />;
}
