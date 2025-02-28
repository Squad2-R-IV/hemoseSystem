//@ts-ignore
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("home", "./routes/home.tsx"),
  route("cadastro", "./routes/cadastro.tsx"),
  route("modulos", "./routes/selecaomodulos.tsx"),
  route("recepcao", "./routes/modulos/recepcao.tsx"),
] satisfies RouteConfig;
