"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const user_routes_1 = require("./routes/user.routes");
const swagger_1 = require("./config/swagger");
const app = express();
app.use(cors());
app.use(express.json());
// Configurar Swagger
(0, swagger_1.setupSwagger)(app);
// Configurar Rotas
app.use("/users", user_routes_1.default);
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
    console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});
