import { Router } from "express";
import { container } from "tsyringe";
import { ArquivoExameController } from "../controllers/ArquivoExameController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";
import { uploadSingle, uploadMultiple } from "../middlewares/upload";

const router = Router();
const arquivoExameController = container.resolve(ArquivoExameController);

/**
 * @swagger
 * tags:
 *   name: ArquivoExame
 *   description: Endpoints para gerenciar arquivos de exames
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ArquivoExame:
 *       type: object
 *       required:
 *         - id_exame
 *         - nome_arquivo
 *         - tipo_arquivo
 *         - tamanho
 *         - conteudo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do arquivo
 *           example: 1
 *         id_exame:
 *           type: integer
 *           description: ID do exame associado
 *           example: 1
 *         nome_arquivo:
 *           type: string
 *           description: Nome do arquivo
 *           example: "resultado_hemograma.pdf"
 *         tipo_arquivo:
 *           type: string
 *           description: Tipo do arquivo
 *           example: "application/pdf"
 *         tamanho:
 *           type: integer
 *           description: Tamanho do arquivo em bytes
 *           example: 1024000
 *         conteudo:
 *           type: string
 *           format: binary
 *           description: Conteúdo do arquivo em bytes
 *         dt_upload:
 *           type: string
 *           format: date-time
 *           description: Data e hora do upload
 *           example: "2024-01-15T10:30:00Z"
 */

/**
 * @swagger
 * /arquivo-exame:
 *   post:
 *     summary: Cria um novo registro de arquivo de exame
 *     tags: [ArquivoExame]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_exame
 *               - nome_arquivo
 *               - tipo_arquivo
 *               - tamanho
 *               - conteudo
 *             properties:
 *               id_exame:
 *                 type: integer
 *                 example: 1
 *               nome_arquivo:
 *                 type: string
 *                 example: "resultado_hemograma.pdf"
 *               tipo_arquivo:
 *                 type: string
 *                 example: "application/pdf"
 *               tamanho:
 *                 type: integer
 *                 example: 1024000
 *               conteudo:
 *                 type: string
 *                 format: binary
 *                 description: Conteúdo do arquivo em bytes
 *     responses:
 *       201:
 *         description: Arquivo de exame criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArquivoExame'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("arquivo_exame_create"), asyncHandler(arquivoExameController.create.bind(arquivoExameController)));

/**
 * @swagger
 * /arquivo-exame:
 *   get:
 *     summary: Retorna todos os arquivos de exames
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de arquivos de exames retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArquivoExame'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("arquivo_exame_read"), asyncHandler(arquivoExameController.getAll.bind(arquivoExameController)));

/**
 * @swagger
 * /arquivo-exame/{id}:
 *   get:
 *     summary: Retorna um arquivo de exame pelo ID
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do arquivo de exame
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Arquivo de exame encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArquivoExame'
 *       404:
 *         description: Arquivo de exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("arquivo_exame_read"), asyncHandler(arquivoExameController.getById.bind(arquivoExameController)));

/**
 * @swagger
 * /arquivo-exame/{id}:
 *   put:
 *     summary: Atualiza um arquivo de exame existente
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do arquivo de exame
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_exame:
 *                 type: integer
 *                 example: 1
 *               nome_arquivo:
 *                 type: string
 *                 example: "resultado_hemograma.pdf"
 *               tipo_arquivo:
 *                 type: string
 *                 example: "application/pdf"
 *               tamanho:
 *                 type: integer
 *                 example: 1024000
 *               conteudo:
 *                 type: string
 *                 format: binary
 *                 description: Conteúdo do arquivo em bytes
 *     responses:
 *       200:
 *         description: Arquivo de exame atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArquivoExame'
 *       404:
 *         description: Arquivo de exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("arquivo_exame_update"), asyncHandler(arquivoExameController.update.bind(arquivoExameController)));

/**
 * @swagger
 * /arquivo-exame/{id}:
 *   delete:
 *     summary: Exclui um arquivo de exame pelo ID
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do arquivo de exame
 *     responses:
 *       204:
 *         description: Arquivo de exame deletado com sucesso
 *       404:
 *         description: Arquivo de exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("arquivo_exame_delete"), asyncHandler(arquivoExameController.delete.bind(arquivoExameController)));

/**
 * @swagger
 * /arquivo-exame/upload:
 *   post:
 *     summary: Faz upload de um arquivo de exame
 *     tags: [ArquivoExame]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - id_exame
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo a ser enviado
 *               id_exame:
 *                 type: integer
 *                 description: ID do exame associado
 *                 example: 1
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArquivoExame'
 *       400:
 *         description: Arquivo inválido ou dados faltando
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/upload",
    authMiddleware,
    checkPermission("arquivo_exame_create"),
    uploadSingle,
    asyncHandler(arquivoExameController.uploadArquivo)
);

/**
 * @swagger
 * /arquivo-exame/upload-multiplos:
 *   post:
 *     summary: Faz upload de múltiplos arquivos de exame
 *     tags: [ArquivoExame]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *               - id_exame
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Arquivos a serem enviados
 *               id_exame:
 *                 type: integer
 *                 description: ID do exame associado
 *                 example: 1
 *     responses:
 *       201:
 *         description: Arquivos enviados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArquivoExame'
 *       400:
 *         description: Arquivos inválidos ou dados faltando
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/upload-multiplos",
    authMiddleware,
    checkPermission("arquivo_exame_create"),
    uploadMultiple,
    asyncHandler(arquivoExameController.uploadMultiplosArquivos)
);

/**
 * @swagger
 * /arquivo-exame/exame/{exameId}:
 *   get:
 *     summary: Retorna arquivos de um exame específico
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: path
 *         name: exameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do exame
 *     responses:
 *       200:
 *         description: Lista de arquivos do exame retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArquivoExame'
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/exame/:exameId",
    authMiddleware,
    checkPermission("arquivo_exame_read"),
    asyncHandler(arquivoExameController.findArquivosByExameId)
);

/**
 * @swagger
 * /arquivo-exame/tipo/{tipoArquivo}:
 *   get:
 *     summary: Retorna arquivos por tipo
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: path
 *         name: tipoArquivo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo do arquivo
 *         example: "application/pdf"
 *     responses:
 *       200:
 *         description: Lista de arquivos do tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArquivoExame'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/tipo/:tipoArquivo",
    authMiddleware,
    checkPermission("arquivo_exame_read"),
    asyncHandler(arquivoExameController.findArquivosByTipo)
);

/**
 * @swagger
 * /arquivo-exame/download/{id}:
 *   get:
 *     summary: Faz download de um arquivo de exame
 *     tags: [ArquivoExame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do arquivo de exame
 *     responses:
 *       200:
 *         description: Arquivo baixado com sucesso
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Arquivo não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/download/:id",
    authMiddleware,
    checkPermission("arquivo_exame_read"),
    asyncHandler(arquivoExameController.downloadArquivo)
);

// Middleware para tratar erros do multer
const _handleMulterError = (err: any, req: any, res: any, next: any) => {
    if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'Arquivo muito grande. Tamanho máximo: 50MB'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: 'Muitos arquivos. Máximo: 10 arquivos'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: 'Campo de arquivo inesperado. Use "file" para upload único ou "files" para múltiplos'
            });
        }
        return res.status(400).json({
            error: err.message || 'Erro no upload do arquivo'
        });
    }
    next();
};

export default router;
