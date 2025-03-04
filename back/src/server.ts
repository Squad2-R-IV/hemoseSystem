import "reflect-metadata";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./config/swagger";
import cookieParser from "cookie-parser";
import { initializeProfiles } from "./mappings/profiles";
import historicoRoutes from "./routes/historico.routes";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Inicializar Mapeamentos do AutoMapper
initializeProfiles();
// Configurar Rotas
app.use("/users", userRoutes);
app.use("/historico", historicoRoutes);
// Configurar Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});
