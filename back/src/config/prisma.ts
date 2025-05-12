import { PrismaClient } from "@prisma/client";
import { handlePrismaError } from "../utils/prismaErrorHandler";
// Register prisma for dependency injection
import { container } from "tsyringe";
import logger from "./winston_logger";
// Create a Prisma Client instance with extended logging
const prisma = new PrismaClient({
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
  prisma.$on('query', (e: any) => {
    logger.debug(`Query: ${e.query}`, {
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

// Log all errors
prisma.$on('error', (e: any) => {
  const handledError = handlePrismaError(e);
  logger.error(`Database error: ${handledError.message}`, {
    error: handledError,
    metadata: handledError.metaData || {},
  });
});

// Log info events
prisma.$on('info', (e: any) => {
  logger.info(`Prisma info: ${e.message}`);
});

// Log warning events
prisma.$on('warn', (e: any) => {
  logger.warn(`Prisma warning: ${e.message}`);
});


container.register("PrismaClient", {
  useValue: prisma
});

export default prisma;
