import type { Route } from "./+types/home";
import { Login } from "~/pages/login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Login" },
    { name: "description", content: "Bem-vindo à tela de login!" },
  ];
}

export default function LoginRoute() {
  return <Login />;
}
