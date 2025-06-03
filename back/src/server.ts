import "reflect-metadata";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./config/swagger";
import cookieParser from "cookie-parser";
import consultaRoutes from "./routes/consulta.routes";
import agendamentoRoutes from "./routes/agendamento.routes";
import pacienteRoutes from "./routes/paciente.routes";
import anamneseRoutes from "./routes/anamnese.routes";
import condutaRoutes from "./routes/conduta.routes";
import evolucaoMedicaRoutes from "./routes/evolucao-medica.routes";
import evolucaoEnfermagemRoutes from "./routes/evolucao-enfermagem.routes";
import altaMedicaRoutes from "./routes/altamedica.routes";
import exameRoutes from "./routes/exame.routes";
import arquivoExameRoutes from "./routes/arquivo-exame.routes";
import administracaoCondutaRoutes from "./routes/administracao-conduta.routes";
import roleRoutes from "./routes/role.routes";
import permissionRoutes from "./routes/permission.routes";
import roleToPermissionRoutes from "./routes/role-to-permission.routes";
import userToRoleRoutes from "./routes/user-to-role.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Configurar Rotas
app.use("/users", userRoutes);
app.use("/consulta", consultaRoutes);
app.use("/agendamento", agendamentoRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/anamnese", anamneseRoutes);
app.use("/conduta", condutaRoutes);
app.use("/evolucao-medica", evolucaoMedicaRoutes);
app.use("/evolucao-enfermagem", evolucaoEnfermagemRoutes);
app.use("/alta-medica", altaMedicaRoutes);
app.use("/exame", exameRoutes);
app.use("/arquivo-exame", arquivoExameRoutes);
app.use("/administracao-conduta", administracaoCondutaRoutes);
app.use("/role", roleRoutes);
app.use("/permission", permissionRoutes);
app.use("/role-to-permission", roleToPermissionRoutes);
app.use("/user-to-role", userToRoleRoutes);

// Configurar Swagger
setupSwagger(app);

// Global error handler middleware - must be after all routes
app.use(errorHandler);

// Alterado para servidor HTTP
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});