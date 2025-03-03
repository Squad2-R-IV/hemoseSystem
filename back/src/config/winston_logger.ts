import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import * as fs from 'fs';

// Cria a pasta 'logs' se ela não existir
const logsDir = path.join(__dirname, '../../logs'); // Ajuste o caminho relativo conforme a estrutura do seu projeto
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Configuração do logger
const logger = createLogger({
    level: 'info', // Nível mínimo de log
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona timestamp
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // Salva logs em arquivos, um por dia
        new transports.File({
            filename: path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`), // Ex: 2025-03-03.log
            maxsize: 5242880, // 5MB (opcional)
            maxFiles: 30, // Mantém 30 dias de logs (opcional)
        }),
        // Exibe logs no console (opcional, útil para desenvolvimento)
        new transports.Console(),
    ],
});

export default logger;