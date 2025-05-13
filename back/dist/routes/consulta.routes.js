"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const ConsultaController_1 = require("../controllers/ConsultaController");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const consultaController = tsyringe_1.container.resolve(ConsultaController_1.ConsultaController);
/**
 * @swagger
 * tags:
 *   name: Consulta
 *   description: Endpoints para gerenciar históricos
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Consulta:
 *       type: object
 *       required:
 *         - id_agendamento
 *         - procedimento
 *         - dt_entrada
 *         - status
 *         - observacoes
 *       properties:
 *         id_consulta:
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
 * /consulta:
 *   get:
 *     summary: Retorna todos os históricos
 *     tags: [Consulta]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de históricos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("consultas_read"), (0, asyncHandler_1.asyncHandler)(consultaController.getAll.bind(consultaController)));
/**
 * @swagger
 * /consulta/{id}:
 *   get:
 *     summary: Retorna um histórico pelo ID
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do histórico
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Histórico encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       404:
 *         description: Histórico não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("consultas_read"), (0, asyncHandler_1.asyncHandler)(consultaController.getById.bind(consultaController)));
/**
 * @swagger
 * /consulta:
 *   post:
 *     summary: Cria um novo histórico
 *     tags: [Consulta]
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
 *               $ref: '#/components/schemas/Consulta'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("consultas_create"), (0, asyncHandler_1.asyncHandler)(consultaController.create.bind(consultaController)));
/**
 * @swagger
 * /consulta/{id}:
 *   put:
 *     summary: Atualiza um histórico existente
 *     tags: [Consulta]
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
 *               $ref: '#/components/schemas/Consulta'
 *       404:
 *         description: Histórico não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("consultas_update"), (0, asyncHandler_1.asyncHandler)(consultaController.update.bind(consultaController)));
/**
 * @swagger
 * /consulta/{id}:
 *   delete:
 *     summary: Exclui um histórico pelo ID
 *     tags: [Consulta]
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
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("consultas_delete"), (0, asyncHandler_1.asyncHandler)(consultaController.delete.bind(consultaController)));
exports.default = router;
