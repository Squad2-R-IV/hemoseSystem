import "reflect-metadata";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./config/swagger";
import cookieParser from "cookie-parser";
import { initializeProfiles } from "./mappings/profiles";
import consultaRoutes from "./routes/consulta.routes";
import agendamentoRoutes from "./routes/agendamento.routes";
import pacienteRoutes from "./routes/paciente.routes";
import anamneseRoutes from "./routes/anamnese.routes";
import condutaRoutes from "./routes/conduta.routes";

import https from 'https';
import path from 'path';
import prescricaoRoutes from "./routes/prescricao.routes";


const fs = require('fs')

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Inicializar Mapeamentos do AutoMapper
initializeProfiles();
// Configurar Rotas
app.use("/users", userRoutes);
app.use("/consulta", consultaRoutes);
app.use("/agendamento", agendamentoRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/anamnese", anamneseRoutes);
app.use("/prescricao", prescricaoRoutes);
app.use("/conduta", condutaRoutes);

// Configurar Swagger
setupSwagger(app);

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
};

https.createServer(options, app).listen(3000, () => {
  console.log("🚀 Server running on https://localhost:3000");
  console.log("📚 Swagger Docs: https://localhost:3000/api-docs");
});
