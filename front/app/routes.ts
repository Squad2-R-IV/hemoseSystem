//@ts-ignore
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/auth/login.tsx"),
  route("home", "./routes/home.tsx"),
  route("cadastro", "./routes/auth/cadastro.tsx"),
  route("modulos", "./routes/selecaomodulos.tsx"),
  route("recepcao", "./routes/modulos/recepcao.tsx"),
  route(
    "atendimento-medico",
    "./routes/modulos/atendimento-medico/selecao-paciente.tsx"
  ),
  route(
    "atendimento-medico-paciente/:id",
    "./routes/modulos/atendimento-medico/paciente.tsx"
  ),
  route(
    "atendimento-geral",
    "./routes/modulos/atendimento-geral/atendimento-geral.tsx"
  ),
  route(
    "atendimento-enfermagem",
    "./routes/modulos/atendimento-enfermagem/selecao-paciente.tsx"
  ),
] satisfies RouteConfig;
