"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaErrorHandler_1 = require("../utils/prismaErrorHandler");
// Register prisma for dependency injection
const tsyringe_1 = require("tsyringe");
const winston_logger_1 = __importDefault(require("./winston_logger"));
// Create a Prisma Client instance with extended logging
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});
// Log all queries in development environment
if (process.env.NODE_ENV !== 'production') {
    prisma.$on('query', (e) => {
        winston_logger_1.default.debug(`Query: ${e.query}`, {
            params: e.params,
            duration: `${e.duration}ms`,
        });
    });
}
// Log all errors
prisma.$on('error', (e) => {
    const handledError = (0, prismaErrorHandler_1.handlePrismaError)(e);
    winston_logger_1.default.error(`Database error: ${handledError.message}`, {
        error: handledError,
        metadata: handledError.metaData || {},
    });
});
// Log info events
prisma.$on('info', (e) => {
    winston_logger_1.default.info(`Prisma info: ${e.message}`);
});
// Log warning events
prisma.$on('warn', (e) => {
    winston_logger_1.default.warn(`Prisma warning: ${e.message}`);
});
tsyringe_1.container.register("PrismaClient", {
    useValue: prisma
});
exports.default = prisma;
