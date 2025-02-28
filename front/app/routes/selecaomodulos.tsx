import type { Route } from "./+types/home";
import { Modulos } from "~/pages/modulos";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemose - Módulos" },
    { name: "description", content: "Seleção de módulos" },
  ];
}

export default function ModulosRoute() {
  return <Modulos />;
}
