import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { prismaError } from "prisma-better-errors";
import logger from "../config/winston_logger";


/**
 * Global error handling middleware for Express
 */
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error for debugging purposes
  logger.error(`Error: ${err.message}`, {
    error: err,
    route: req.path,
    method: req.method,
    requestBody: req.body,
    requestParams: req.params,
    requestQuery: req.query,
  });

  // Handle Prisma Better Errors
  if (err instanceof prismaError) {
    res.status(err.statusCode || 500).json({
      titulo: err.title || 'Erro de Banco de Dados',
      mensagem: err.message || 'Ocorreu um erro na operação do banco de dados',
      dados: err.metaData,
    });
    return;
  }

  // Handle other errors that might have been formatted with status codes
  if (err.statusCode) {
    // Vamos filtrar metaData conforme o ambiente - em produção, não enviamos detalhes técnicos
    const metaData = process.env.NODE_ENV === 'production' 
      ? (err.metaData?.fields ? { campos: err.metaData.fields } : undefined)
      : err.metaData;

    res.status(err.statusCode).json({
      titulo: err.title || 'Erro da Aplicação',
      mensagem: err.message,
      ...(metaData && { dados: metaData }),
    });
    return;
  }

  // Erros de validação (possíveis erros de express-validator, joi, etc)
  if (err.name === 'ValidationError' || (err.errors && Array.isArray(err.errors))) {
    res.status(400).json({
      titulo: 'Erro de Validação',
      mensagem: 'Há problemas com os dados enviados',
      dados: { 
        erros: Array.isArray(err.errors) ? err.errors : (err.details || [])
      }
    });
    return;
  }

  // Erro 404 personalizado
  if (err.name === 'NotFoundError') {
    res.status(404).json({
      titulo: 'Não Encontrado',
      mensagem: err.message || 'O recurso solicitado não foi encontrado',
    });
    return;
  }

  // Erro de autenticação e autorização
  if (err.name === 'UnauthorizedError' || err.name === 'AuthenticationError') {
    res.status(401).json({
      titulo: 'Acesso Não Autorizado',
      mensagem: 'Você precisa estar autenticado para acessar este recurso',
    });
    return;
  }

  if (err.name === 'ForbiddenError') {
    res.status(403).json({
      titulo: 'Acesso Negado',
      mensagem: 'Você não tem permissão para acessar este recurso',
    });
    return;
  }

  // Default error response
  res.status(500).json({
    titulo: 'Erro Interno do Servidor',
    mensagem: process.env.NODE_ENV === 'production' 
      ? 'Ocorreu um erro interno. Por favor, tente novamente mais tarde.'
      : err.message || 'Erro Interno do Servidor',
  });
};