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
const consulta_routes_1 = __importDefault(require("./routes/consulta.routes"));
const agendamento_routes_1 = __importDefault(require("./routes/agendamento.routes"));
const paciente_routes_1 = __importDefault(require("./routes/paciente.routes"));
const anamnese_routes_1 = __importDefault(require("./routes/anamnese.routes"));
const conduta_routes_1 = __importDefault(require("./routes/conduta.routes"));
const evolucao_medica_routes_1 = __importDefault(require("./routes/evolucao-medica.routes"));
const evolucao_enfermagem_routes_1 = __importDefault(require("./routes/evolucao-enfermagem.routes"));
const altamedica_routes_1 = __importDefault(require("./routes/altamedica.routes"));
const exame_routes_1 = __importDefault(require("./routes/exame.routes"));
const arquivo_exame_routes_1 = __importDefault(require("./routes/arquivo-exame.routes"));
const administracao_conduta_routes_1 = __importDefault(require("./routes/administracao-conduta.routes"));
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const permission_routes_1 = __importDefault(require("./routes/permission.routes"));
const role_to_permission_routes_1 = __importDefault(require("./routes/role-to-permission.routes"));
const user_to_role_routes_1 = __importDefault(require("./routes/user-to-role.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Configurar Rotas
app.use("/users", user_routes_1.default);
app.use("/consulta", consulta_routes_1.default);
app.use("/agendamento", agendamento_routes_1.default);
app.use("/paciente", paciente_routes_1.default);
app.use("/anamnese", anamnese_routes_1.default);
app.use("/conduta", conduta_routes_1.default);
app.use("/evolucao-medica", evolucao_medica_routes_1.default);
app.use("/evolucao-enfermagem", evolucao_enfermagem_routes_1.default);
app.use("/alta-medica", altamedica_routes_1.default);
app.use("/exame", exame_routes_1.default);
app.use("/arquivo-exame", arquivo_exame_routes_1.default);
app.use("/administracao-conduta", administracao_conduta_routes_1.default);
app.use("/role", role_routes_1.default);
app.use("/permission", permission_routes_1.default);
app.use("/role-to-permission", role_to_permission_routes_1.default);
app.use("/user-to-role", user_to_role_routes_1.default);
// Configurar Swagger
(0, swagger_1.setupSwagger)(app);
// Global error handler middleware - must be after all routes
app.use(errorHandler_1.errorHandler);
// Alterado para servidor HTTP
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
    console.log("📚 Swagger Docs: http://localhost:3000/api-docs");
});
//# sourceMappingURL=server.js.map