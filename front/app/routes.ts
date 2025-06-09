//@ts-ignore
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./routes/auth/login.tsx"),
  layout("./components/main-layout/main-layout.tsx", [
    route("home", "./routes/home.tsx"),
    route("cadastro", "./routes/auth/cadastro.tsx"),
    route("recepcao", "./routes/recepcao.tsx"),
    // TODO: Create these files when implementing the atendimento modules
    // route(
    //   "atendimento-medico-paciente/:id",
    //   "./pages/modulos/atendimento-medico/paciente.tsx"
    // ),
    // route(
    //   "atendimento-geral",
    //   "./pages/modulos/atendimento-geral/atendimento-geral.tsx"
    // ),
    route(
      "selecao-agendamento",
      "./routes/selecao-agendamento.tsx"
    ),
    route(
      "consulta/:id",
      "./routes/consulta.tsx"
    ),    route(
      "prontuarios",
      "./routes/prontuarios.tsx"
    ),
    route(
      "prontuarios/:pacienteId",
      "./pages/pacientes/pacienteDetail.tsx"
    ),
    route(
      "exame/:exameId",
      "./pages/pacientes/exameDetail.tsx"
    ),
    route(
      "enfermaria",
      "./routes/enfermaria.tsx"
    ),
    route(
      "funcionarios",
      "./routes/funcionarios.tsx"
    ),   
    route(
      "funcionarios/:role",
      "./routes/funcionarios/funcionarios-role.tsx"
    ),
    route(
      "admin/permissions",
      "./routes/admin/permissions.tsx"
    ),
    route(
      "admin/roles",
      "./routes/admin/roles.tsx"
    ),
    route(
      "admin/role-permissions/:roleId",
      "./routes/admin/role-permissions.tsx"
    ),
    route(
      "admin/user-roles/:userId",
      "./routes/admin/user-roles.tsx"
    ),
  ]),
] satisfies RouteConfig;
