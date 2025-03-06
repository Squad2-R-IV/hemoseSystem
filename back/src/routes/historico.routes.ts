import { Router } from "express";
import { container } from "tsyringe";
import { HistoricoController } from "../controllers/HistoricoController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";
import { tipo_procedimento_enum } from "@prisma/client";

const router = Router();
const historicoController = container.resolve(HistoricoController);

/**
 * @swagger
 * tags:
 *   name: Historico
 *   description: Endpoints para gerenciar históricos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Historico:
 *       type: object
 *       required:
 *         - id_agendamento
 *         - procedimento
 *         - dt_entrada
 *         - status
 *         - observacoes
 *       properties:
 *         id_historico:
 *           type: integer
 *           description: ID único do histórico
 *           example: 1
 *         id_agendamento:
 *           type: integer
 *           description: ID do agendamento relacionado
 *           example: 123
 *         procedimento:
 *           type: string
 *           enum: [PROCEDIMENTO_A, PROCEDIMENTO_B]
 *           description: Tipo de procedimento
 *           example: "PROCEDIMENTO_A"
 *         dt_entrada:
 *           type: string
 *           format: date-time
 *           description: Data e hora de entrada
 *           example: "2025-03-03T10:00:00Z"
 *         dt_saida:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Data e hora de saída (opcional)
 *           example: "2025-03-03T11:00:00Z"
 *         status:
 *           type: string
 *           description: Status do histórico
 *           maxLength: 50
 *           example: "A"
 *         observacoes:
 *           type: string
 *           description: Observações sobre o histórico
 *           example: "Procedimento realizado com sucesso"
 */

/**
 * @swagger
 * /historico:
 *   get:
 *     summary: Retorna todos os históricos
 *     tags: [Historico]
 *     responses:
 *       200:
 *         description: Lista de históricos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Historico'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("historicos_read"), asyncHandler(historicoController.getAll.bind(historicoController)));

/**
 * @swagger
 * /historico/{id}:
 *   get:
 *     summary: Retorna um histórico pelo ID
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do histórico
 *     responses:
 *       200:
 *         description: Histórico encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       404:
 *         description: Histórico não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("historicos_read"), asyncHandler(historicoController.getById.bind(historicoController)));

/**
 * @swagger
 * /historico:
 *   post:
 *     summary: Cria um novo histórico
 *     tags: [Historico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_agendamento
 *               - procedimento
 *               - dt_entrada
 *               - status
 *               - observacoes
 *             properties:
 *               id_agendamento:
 *                 type: integer
 *                 example: 123
 *               procedimento:
 *                 type: string
 *                 enum: [PROCEDIMENTO_A, PROCEDIMENTO_B]
 *                 example: "PROCEDIMENTO_A"
 *               dt_entrada:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-03T10:00:00Z"
 *               status:
 *                 type: string
 *                 maxLength: 50
 *                 example: "A"
 *               observacoes:
 *                 type: string
 *                 example: "Procedimento iniciado"
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("historicos_create"), asyncHandler(historicoController.create.bind(historicoController)));

/**
 * @swagger
 * /historico/{id}:
 *   put:
 *     summary: Atualiza um histórico existente
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do histórico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - procedimento
 *               - dt_entrada
 *               - status
 *               - observacoes
 *             properties:
 *               procedimento:
 *                 type: string
 *                 enum: [PROCEDIMENTO_A, PROCEDIMENTO_B]
 *                 example: "PROCEDIMENTO_A"
 *               dt_entrada:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-03T10:00:00Z"
 *               dt_saida:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2025-03-03T11:00:00Z"
 *               status:
 *                 type: string
 *                 maxLength: 50
 *                 example: "A"
 *               observacoes:
 *                 type: string
 *                 example: "Procedimento atualizado"
 *     responses:
 *       200:
 *         description: Histórico atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       404:
 *         description: Histórico não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("historicos_update"), asyncHandler(historicoController.update.bind(historicoController)));

/**
 * @swagger
 * /historico/{id}:
 *   delete:
 *     summary: Exclui um histórico pelo ID
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do histórico
 *     responses:
 *       204:
 *         description: Histórico deletado com sucesso
 *       404:
 *         description: Histórico não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("historicos_delete"), asyncHandler(historicoController.delete.bind(historicoController)));

export default router;