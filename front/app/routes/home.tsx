import type { Route } from "./+types/home";
import { Home as HomePage } from "../pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeRoute() {
  return <HomePage />;
}
