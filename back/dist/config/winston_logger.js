"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Cria a pasta 'logs' se ela não existir
const logsDir = path.join(__dirname, '../../logs'); // Ajuste o caminho relativo conforme a estrutura do seu projeto
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}
// Configuração do logger
const logger = (0, winston_1.createLogger)({
    level: 'info', // Nível mínimo de log
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona timestamp
    winston_1.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })),
    transports: [
        // Salva logs em arquivos, um por dia
        new winston_1.transports.File({
            filename: path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`), // Ex: 2025-03-03.log
            maxsize: 5242880, // 5MB (opcional)
            maxFiles: 30, // Mantém 30 dias de logs (opcional)
        }),
        // Exibe logs no console (opcional, útil para desenvolvimento)
        new winston_1.transports.Console(),
    ],
});
exports.default = logger;
//# sourceMappingURL=winston_logger.js.map