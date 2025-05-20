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
import path from 'path';
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

// Configurar Swagger
setupSwagger(app);

// Global error handler middleware - must be after all routes
app.use(errorHandler);

// Alterado para servidor HTTP
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});