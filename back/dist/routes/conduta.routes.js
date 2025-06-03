"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CondutaController_1 = require("../controllers/CondutaController");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const condutaController = tsyringe_1.container.resolve(CondutaController_1.CondutaController);
/**
 * @swagger
 * tags:
 *   name: Conduta
 *   description: Endpoints para gerenciar condutas
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Conduta:
 *       type: object
 *       required:
 *         - id_consulta
 *         - id_funcionario
 *         - cid
 *       properties:
 *         id_conduta:
 *           type: integer
 *           description: ID único da conduta
 *           example: 1
 *         id_consulta:
 *           type: integer
 *           description: ID da consulta relacionada
 *           example: 101
 *         id_funcionario:
 *           type: string
 *           description: ID do funcionário responsável
 *           example: "func123"
 *         cid:
 *           type: string
 *           description: Código CID relacionado
 *           example: "A00"
 *         queixa_principal:
 *           type: string
 *           description: Queixa principal do paciente
 *           example: "Dor abdominal"
 *         historia_doenca_atual:
 *           type: string
 *           description: História da doença atual
 *           example: "Paciente relata dor há 3 dias."
 *         antecedentes_pessoais:
 *           type: string
 *           description: Antecedentes pessoais do paciente
 *           example: "Hipertensão"
 *         antecedentes_familiares:
 *           type: string
 *           description: Antecedentes familiares do paciente
 *           example: "Diabetes na família"
 *         habitos_vida:
 *           type: string
 *           description: Hábitos de vida do paciente
 *           example: "Fumante"
 *         medicamentos_em_uso:
 *           type: string
 *           description: Medicamentos em uso pelo paciente
 *           example: "Paracetamol"
 *         alergias:
 *           type: string
 *           description: Alergias do paciente
 *           example: "Alergia a penicilina"
 *         cirurgias_previas:
 *           type: string
 *           description: Cirurgias prévias do paciente
 *           example: "Apendicectomia"
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *           example: "Paciente ansioso"
 */
/**
 * @swagger
 * /conduta:
 *   get:
 *     summary: Retorna todas as condutas
 *     tags: [Conduta]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de condutas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conduta'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("conduta_read"), (0, asyncHandler_1.asyncHandler)(condutaController.getAll.bind(condutaController)));
/**
 * @swagger
 * /conduta/consulta:
 *   get:
 *     summary: Retorna todas as condutas relacionadas a uma consulta específica
 *     tags: [Conduta]
 *     parameters:
 *       - in: query
 *         name: consultaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Lista de condutas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conduta'
 *       404:
 *         description: Nenhuma conduta encontrada para a consulta
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/consulta", auth_1.authMiddleware, (0, auth_1.checkPermission)("conduta_read"), (0, asyncHandler_1.asyncHandler)(condutaController.getCondutasByConsultaId.bind(condutaController)));
/**
 * @swagger
 * /conduta/{id}:
 *   get:
 *     summary: Retorna uma conduta pelo ID
 *     tags: [Conduta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da conduta
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Conduta encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conduta'
 *       404:
 *         description: Conduta não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("conduta_read"), (0, asyncHandler_1.asyncHandler)(condutaController.getById.bind(condutaController)));
/**
 * @swagger
 * /conduta:
 *   post:
 *     summary: Cria uma nova conduta
 *     tags: [Conduta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_consulta
 *               - id_funcionario
 *               - conduta
 *             properties:
 *               id_consulta:
 *                 type: integer
 *                 example: 101
 *               id_funcionario:
 *                 type: string
 *                 example: "func123"
 *               conduta:
 *                 type: string
 *                 example: "Paciente orientado a repouso e hidratação."
 *     responses:
 *       201:
 *         description: Conduta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conduta'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("conduta_create"), (0, asyncHandler_1.asyncHandler)(condutaController.create.bind(condutaController)));
/**
 * @swagger
 * /conduta/{id}:
 *   put:
 *     summary: Atualiza uma conduta existente
 *     tags: [Conduta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da conduta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_consulta:
 *                 type: integer
 *                 example: 101
 *               id_funcionario:
 *                 type: string
 *                 example: "func123"
 *               conduta:
 *                 type: string
 *                 example: "Paciente orientado a repouso e hidratação."
 *     responses:
 *       200:
 *         description: Conduta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conduta'
 *       404:
 *         description: Conduta não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("conduta_update"), (0, asyncHandler_1.asyncHandler)(condutaController.update.bind(condutaController)));
/**
 * @swagger
 * /conduta/{id}:
 *   delete:
 *     summary: Exclui uma conduta pelo ID
 *     tags: [Conduta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da conduta
 *     responses:
 *       204:
 *         description: Conduta deletada com sucesso
 *       404:
 *         description: Conduta não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("conduta_delete"), (0, asyncHandler_1.asyncHandler)(condutaController.delete.bind(condutaController)));
exports.default = router;
//# sourceMappingURL=conduta.routes.js.map