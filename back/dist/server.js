"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const swagger_1 = require("./config/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const profiles_1 = require("./mappings/profiles");
const consulta_routes_1 = __importDefault(require("./routes/consulta.routes"));
const agendamento_routes_1 = __importDefault(require("./routes/agendamento.routes"));
const paciente_routes_1 = __importDefault(require("./routes/paciente.routes"));
const anamnese_routes_1 = __importDefault(require("./routes/anamnese.routes"));
const conduta_routes_1 = __importDefault(require("./routes/conduta.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Inicializar Mapeamentos do AutoMapper
(0, profiles_1.initializeProfiles)();
// Configurar Rotas
app.use("/users", user_routes_1.default);
app.use("/consulta", consulta_routes_1.default);
app.use("/agendamento", agendamento_routes_1.default);
app.use("/paciente", paciente_routes_1.default);
app.use("/anamnese", anamnese_routes_1.default);
app.use("/conduta", conduta_routes_1.default);
// Configurar Swagger
(0, swagger_1.setupSwagger)(app);
// Global error handler middleware - must be after all routes
app.use(errorHandler_1.errorHandler);
// Alterado para servidor HTTP
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
    console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});
