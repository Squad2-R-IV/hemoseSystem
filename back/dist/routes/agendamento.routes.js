"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const AgendamentoController_1 = require("../controllers/AgendamentoController");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const agendamentoController = tsyringe_1.container.resolve(AgendamentoController_1.AgendamentoController);
/**
 * @swagger
 * tags:
 *   name: Agendamento
 *   description: Endpoints para gerenciar agendamentos
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Agendamento:
 *       type: object
 *       required:
 *         - id_paciente
 *         - id_funcionario
 *         - data_hora_agendamento
 *         - tipo_agendamento
 *         - status_agendamento
 *       properties:
 *         id_agendamento:
 *           type: integer
 *           description: ID único do agendamento
 *           example: 1
 *         id_paciente:
 *           type: integer
 *           description: ID do paciente relacionado
 *           example: 123
 *         id_funcionario:
 *           type: string
 *           description: ID do funcionário relacionado
 *           example: "some-uuid-1"
 *         data_hora_agendamento:
 *           type: string
 *           format: date-time
 *           description: Data e hora do agendamento
 *           example: "2025-03-10T10:00:00Z"
 *         tipo_agendamento:
 *           type: string
 *           enum: [Consulta, Exame, Procedimento]
 *           description: Tipo de agendamento
 *           example: "Consulta"
 *         status_agendamento:
 *           type: string
 *           enum: [Agendado, Confirmado, Realizado, Cancelado, Reagendado]
 *           description: Status do agendamento
 *           example: "Agendado"
 *         observacoes:
 *           type: string
 *           description: Observações sobre o agendamento
 *           example: "Primeira consulta"
 */
/**
 * @swagger
 * /agendamento/data/{date}:
 *   get:
 *     summary: Retorna agendamentos para uma data específica
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Data no formato YYYY-MM-DD
 *         example: "2023-12-31"
 *     responses:
 *       200:
 *         description: Lista de agendamentos para a data especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: Data inválida ou não informada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/data/:date", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_read"), (0, asyncHandler_1.asyncHandler)(agendamentoController.getAgendamentosByDate.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento:
 *   get:
 *     summary: Retorna todos os agendamentos
 *     tags: [Agendamento]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_read"), (0, asyncHandler_1.asyncHandler)(agendamentoController.getAll.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento/consultas-ativas:
 *   get:
 *     summary: Retorna agendamentos com consultas ativas (aguardando ou em atendimento)
 *     tags: [Agendamento]
 *     responses:
 *       200:
 *         description: Lista de agendamentos com consultas ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/consultas-ativas", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_read"), (0, asyncHandler_1.asyncHandler)(agendamentoController.getAgendamentosComConsultasAtivas.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento/consultas-enfermaria:
 *   get:
 *     summary: Retorna agendamentos com consultas ativas (aguardando ou em atendimento)
 *     tags: [Agendamento]
 *     responses:
 *       200:
 *         description: Lista de agendamentos com consultas ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/consultas-enfermaria", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_read"), (0, asyncHandler_1.asyncHandler)(agendamentoController.getAgendamentosNaEnfermaria.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento/{id}:
 *   get:
 *     summary: Retorna um agendamento pelo ID
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Agendamento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_read"), (0, asyncHandler_1.asyncHandler)(agendamentoController.getById.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_paciente
 *               - id_funcionario
 *               - data_hora_agendamento
 *               - tipo_agendamento
 *               - status_agendamento
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 example: 123
 *               id_funcionario:
 *                 type: string
 *                 example: "some-uuid-1"
 *               data_hora_agendamento:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-10T10:00:00Z"
 *               tipo_agendamento:
 *                 type: string
 *                 enum: [Consulta, Exame, Procedimento]
 *                 example: "Consulta"
 *               status_agendamento:
 *                 type: string
 *                 enum: [Agendado, Confirmado, Realizado, Cancelado, Reagendado]
 *                 example: "Agendado"
 *               observacoes:
 *                 type: string
 *                 example: "Primeira consulta"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_create"), (0, asyncHandler_1.asyncHandler)(agendamentoController.create.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_paciente
 *               - id_funcionario
 *               - data_hora_agendamento
 *               - tipo_agendamento
 *               - status_agendamento
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 example: 123
 *               id_funcionario:
 *                 type: string
 *                 example: "some-uuid-1"
 *               data_hora_agendamento:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-10T10:00:00Z"
 *               tipo_agendamento:
 *                 type: string
 *                 enum: [Consulta, Exame, Procedimento]
 *                 example: "Consulta"
 *               status_agendamento:
 *                 type: string
 *                 enum: [Agendado, Confirmado, Realizado, Cancelado, Reagendado]
 *                 example: "Agendado"
 *               observacoes:
 *                 type: string
 *                 example: "Primeira consulta"
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_update"), (0, asyncHandler_1.asyncHandler)(agendamentoController.update.bind(agendamentoController)));
/**
 * @swagger
 * /agendamento/{id}:
 *   delete:
 *     summary: Exclui um agendamento pelo ID
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       204:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("agendamento_delete"), (0, asyncHandler_1.asyncHandler)(agendamentoController.delete.bind(agendamentoController)));
exports.default = router;
//# sourceMappingURL=agendamento.routes.js.map