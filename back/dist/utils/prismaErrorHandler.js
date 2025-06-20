"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = void 0;
const client_1 = require("@prisma/client");
const prisma_better_errors_1 = require("prisma-better-errors");
/**
 * Handles Prisma errors by wrapping them with prisma-better-errors and adding friendly messages in Portuguese
 * @param error Any error that might come from Prisma operations
 * @returns The properly formatted error with descriptive messages and HTTP status codes
 */
const handlePrismaError = (error) => {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // Tratamento específico para erros conhecidos do Prisma
        switch (error.code) {
            case 'P2002': { // Violação de restrição única
                let fieldName = 'desconhecido';
                // Verifica se target existe
                if (error.meta?.target) {
                    const target = error.meta.target;
                    if (Array.isArray(target)) {
                        // Se for array, usa join
                        fieldName = target.join(', ');
                    }
                    else if (typeof target === 'string') {
                        // Se for string no formato 'Table_field_key', extrair apenas o campo
                        const parts = target.split('_');
                        if (parts.length >= 2) {
                            // Remove a parte final '_key' se existir e pega o penúltimo elemento
                            const lastPart = parts[parts.length - 1];
                            if (lastPart === 'key') {
                                fieldName = parts[parts.length - 2]; // Pega o penúltimo elemento
                            }
                            else {
                                fieldName = target; // Usa a string original se não seguir o padrão
                            }
                        }
                        else {
                            fieldName = target; // Caso não seja possível dividir, usa o valor original
                        }
                    }
                    else {
                        // Para qualquer outro tipo
                        fieldName = String(target);
                    }
                }
                const newError = new Error(`Já existe um registro com o valor informado para o campo: ${fieldName}`);
                newError.statusCode = 409;
                newError.title = 'Erro de Duplicação';
                newError.metaData = { fields: fieldName };
                return newError;
            }
            case 'P2003': { // Violação de restrição de chave estrangeira
                const field = error.meta?.field_name || 'desconhecido';
                const newError = new Error(`Referência inválida para o campo: ${field}`);
                newError.statusCode = 400;
                newError.title = 'Erro de Referência';
                return newError;
            }
            case 'P2025': { // Registro não encontrado
                const newError = new Error('Registro não encontrado');
                newError.statusCode = 404;
                newError.title = 'Não Encontrado';
                return newError;
            }
            case 'P2014': { // Violação de relação obrigatória
                const newError = new Error('Não foi possível completar a operação devido a uma relação obrigatória não atendida');
                newError.statusCode = 400;
                newError.title = 'Erro de Relação';
                return newError;
            }
            case 'P2021': { // Tabela não existe
                const newError = new Error('Ocorreu um erro interno no banco de dados');
                newError.statusCode = 500;
                newError.title = 'Erro Interno';
                return newError;
            }
            default:
                // Para outros erros conhecidos, usar prisma-better-errors mas traduzir a mensagem
                const betterError = new prisma_better_errors_1.prismaError(error);
                betterError.message = 'Ocorreu um erro no banco de dados';
                betterError.title = 'Erro de Banco de Dados';
                return betterError;
        }
    }
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        // Tradução para erros de validação
        const newError = new Error('Erro de validação nos dados fornecidos. Verifique se todos os campos obrigatórios foram preenchidos corretamente.');
        newError.statusCode = 400;
        newError.title = 'Erro de Validação';
        return newError;
    }
    if (error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        // Tradução para erros de requisição desconhecidos
        const newError = new Error('Ocorreu um erro inesperado na operação do banco de dados');
        newError.statusCode = 500;
        newError.title = 'Erro de Banco de Dados';
        return newError;
    }
    if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
        // Tradução para erros de inicialização
        const newError = new Error('Falha na conexão com o banco de dados');
        newError.statusCode = 500;
        newError.title = 'Erro de Conexão';
        return newError;
    }
    if (error instanceof client_1.Prisma.PrismaClientRustPanicError) {
        // Tradução para erros de panic do Rust
        const newError = new Error('Erro interno no mecanismo do banco de dados');
        newError.statusCode = 500;
        newError.title = 'Erro Interno';
        return newError;
    }
    // Para qualquer outro tipo de erro
    return error;
};
exports.handlePrismaError = handlePrismaError;
//# sourceMappingURL=prismaErrorHandler.js.map