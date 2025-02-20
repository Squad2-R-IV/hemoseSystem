import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Configurar Rotas
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});
