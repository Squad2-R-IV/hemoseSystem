//@ts-ignore
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./routes/auth/login.tsx"),
  layout("./components/main-layout/main-layout.tsx", [
    route("home", "./routes/home.tsx"),
    route("cadastro", "./routes/auth/cadastro.tsx"),
    route("modulos", "./routes/selecaomodulos.tsx"),
    route("recepcao", "./routes/modulos/recepcao.tsx"),
    /*route(
      "atendimento-medico",
      "./routes/modulos/atendimento-medico/selecao-paciente.tsx"
    ),*/
    route(
      "atendimento-medico-paciente/:id",
      "./routes/modulos/atendimento-medico/paciente.tsx"
    ),
    route(
      "atendimento-geral",
      "./routes/modulos/atendimento-geral/atendimento-geral.tsx"
    ),
    route(
      "selecao-agendamento",
      "./routes/modulos/ambulatorio/selecao-agendamento.tsx"
    ),
    route(
      "consulta/:id",
      "./routes/modulos/consulta.tsx"
    ),    route(
      "prontuarios",
      "./routes/prontuarios.tsx"
    ),    route(
      "prontuarios/:pacienteId",
      "./pages/pacientes/pacienteDetail.tsx"
    ),
    route(
      "exame/:exameId",
      "./pages/pacientes/exameDetail.tsx"
    ),
    route(
      "funcionarios",
      "./routes/funcionarios.tsx"
    ),
    route(
      "funcionarios/:role",
      "./routes/funcionarios/funcionarios-role.tsx"
    ),
  ]),
] satisfies RouteConfig;
