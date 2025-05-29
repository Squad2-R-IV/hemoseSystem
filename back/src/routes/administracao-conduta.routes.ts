import { Router } from "express";
import { container } from "tsyringe";
import { AdministracaoCondutaController } from "../controllers/AdministracaoCondutaController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const administracaoCondutaController = container.resolve(AdministracaoCondutaController);

/**
 * @swagger
 * tags:
 *   name: AdministracaoConduta
 *   description: Endpoints para gerenciar administração de condutas
 */

/**
 * @swagger
 * /administracao-conduta/conduta:
 *   get:
 *     summary: Retorna todas as administrações de conduta relacionadas a uma conduta específica
 *     tags: [AdministracaoConduta]
 *     parameters:
 *       - in: query
 *         name: condutaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da conduta
 *     responses:
 *       200:
 *         description: Lista de administrações de conduta retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdministracaoConduta'
 *       404:
 *         description: Nenhuma administração de conduta encontrada para a conduta
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/conduta",
  authMiddleware,
  checkPermission("administracao_conduta_read"),
  asyncHandler(administracaoCondutaController.getAdministracaoCondutaByCondutaId.bind(administracaoCondutaController))
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AdministracaoConduta:
 *       type: object
 *       required:
 *         - id_conduta
 *         - id_funcionario
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da administração de conduta
 *           example: 1
 *         id_conduta:
 *           type: integer
 *           description: ID da conduta relacionada
 *           example: 101
 *         id_funcionario:
 *           type: string
 *           description: ID do funcionário responsável pela administração
 *           example: "func123"
 *         dt_administracao:
 *           type: string
 *           format: date-time
 *           description: Data e hora da administração da conduta
 *           example: "2025-05-28T14:30:00Z"
 *         observacoes:
 *           type: string
 *           description: Observações sobre a administração da conduta
 *           example: "Medicação administrada conforme prescrição médica"
 *         Conduta:
 *           type: object
 *           $ref: '#/components/schemas/Conduta'
 *           description: Dados da conduta relacionada
 *         Funcionario:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Dados do funcionário responsável
 */

/**
 * @swagger
 * /administracao-conduta:
 *   get:
 *     summary: Retorna todas as administrações de conduta
 *     tags: [AdministracaoConduta]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de administrações de conduta retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdministracaoConduta'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("administracao_conduta_read"), asyncHandler(administracaoCondutaController.getAll.bind(administracaoCondutaController)));

/**
 * @swagger
 * /administracao-conduta/{id}:
 *   get:
 *     summary: Retorna uma administração de conduta pelo ID
 *     tags: [AdministracaoConduta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da administração de conduta
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Administração de conduta encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdministracaoConduta'
 *       404:
 *         description: Administração de conduta não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("administracao_conduta_read"), asyncHandler(administracaoCondutaController.getById.bind(administracaoCondutaController)));

/**
 * @swagger
 * /administracao-conduta:
 *   post:
 *     summary: Cria uma nova administração de conduta
 *     tags: [AdministracaoConduta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_conduta
 *               - id_funcionario
 *             properties:
 *               id_conduta:
 *                 type: integer
 *                 example: 101
 *               id_funcionario:
 *                 type: string
 *                 example: "func123"
 *               dt_administracao:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-28T14:30:00Z"
 *               observacoes:
 *                 type: string
 *                 example: "Medicação administrada conforme prescrição médica"
 *     responses:
 *       201:
 *         description: Administração de conduta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdministracaoConduta'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("administracao_conduta_create"), asyncHandler(administracaoCondutaController.create.bind(administracaoCondutaController)));

/**
 * @swagger
 * /administracao-conduta/{id}:
 *   put:
 *     summary: Atualiza uma administração de conduta existente
 *     tags: [AdministracaoConduta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da administração de conduta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_conduta:
 *                 type: integer
 *                 example: 101
 *               id_funcionario:
 *                 type: string
 *                 example: "func123"
 *               dt_administracao:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-28T14:30:00Z"
 *               observacoes:
 *                 type: string
 *                 example: "Medicação administrada conforme prescrição médica"
 *     responses:
 *       200:
 *         description: Administração de conduta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdministracaoConduta'
 *       404:
 *         description: Administração de conduta não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("administracao_conduta_update"), asyncHandler(administracaoCondutaController.update.bind(administracaoCondutaController)));

/**
 * @swagger
 * /administracao-conduta/{id}:
 *   delete:
 *     summary: Exclui uma administração de conduta pelo ID
 *     tags: [AdministracaoConduta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da administração de conduta
 *     responses:
 *       204:
 *         description: Administração de conduta deletada com sucesso
 *       404:
 *         description: Administração de conduta não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("administracao_conduta_delete"), asyncHandler(administracaoCondutaController.delete.bind(administracaoCondutaController)));

export default router;
