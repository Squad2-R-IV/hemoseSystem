//@ts-ignore
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("home", "./routes/home.tsx"),
  route("cadastro", "./routes/cadastro.tsx"),
] satisfies RouteConfig;
