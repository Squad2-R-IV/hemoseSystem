"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const AnamneseController_1 = require("../controllers/AnamneseController");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const anamneseController = tsyringe_1.container.resolve(AnamneseController_1.AnamneseController);
/**
 * @swagger
 * tags:
 *   name: Anamnese
 *   description: Endpoints para gerenciar anamneses
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Anamnese:
 *       type: object
 *       required:
 *         - id_consulta
 *         - id_funcionario
 *         - cid
 *       properties:
 *         id_anamnese:
 *           type: integer
 *           description: ID único da anamnese
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
 * /anamnese:
 *   get:
 *     summary: Retorna todas as anamneses
 *     tags: [Anamnese]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de anamneses retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anamnese'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("anamnese_read"), (0, asyncHandler_1.asyncHandler)(anamneseController.getAll.bind(anamneseController)));
/**
 * @swagger
 * /anamnese/{id}:
 *   get:
 *     summary: Retorna uma anamnese pelo ID
 *     tags: [Anamnese]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da anamnese
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Anamnese encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anamnese'
 *       404:
 *         description: Anamnese não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("anamnese_read"), (0, asyncHandler_1.asyncHandler)(anamneseController.getById.bind(anamneseController)));
/**
 * @swagger
 * /anamnese:
 *   post:
 *     summary: Cria uma nova anamnese
 *     tags: [Anamnese]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_consulta
 *               - id_funcionario
 *               - cid
 *             properties:
 *               id_consulta:
 *                 type: integer
 *                 example: 101
 *               id_funcionario:
 *                 type: string
 *                 example: "func123"
 *               cid:
 *                 type: string
 *                 example: "A00"
 *               queixa_principal:
 *                 type: string
 *                 example: "Dor abdominal"
 *               historia_doenca_atual:
 *                 type: string
 *                 example: "Paciente relata dor há 3 dias."
 *               antecedentes_pessoais:
 *                 type: string
 *                 example: "Hipertensão"
 *               antecedentes_familiares:
 *                 type: string
 *                 example: "Diabetes na família"
 *               habitos_vida:
 *                 type: string
 *                 example: "Fumante"
 *               medicamentos_em_uso:
 *                 type: string
 *                 example: "Paracetamol"
 *               alergias:
 *                 type: string
 *                 example: "Alergia a penicilina"
 *               cirurgias_previas:
 *                 type: string
 *                 example: "Apendicectomia"
 *               observacoes:
 *                 type: string
 *                 example: "Paciente ansioso"
 *     responses:
 *       201:
 *         description: Anamnese criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anamnese'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("anamnese_create"), (0, asyncHandler_1.asyncHandler)(anamneseController.create.bind(anamneseController)));
/**
 * @swagger
 * /anamnese/{id}:
 *   put:
 *     summary: Atualiza uma anamnese existente
 *     tags: [Anamnese]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da anamnese
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               queixa_principal:
 *                 type: string
 *                 example: "Dor abdominal"
 *               historia_doenca_atual:
 *                 type: string
 *                 example: "Paciente relata dor há 3 dias."
 *               antecedentes_pessoais:
 *                 type: string
 *                 example: "Hipertensão"
 *               antecedentes_familiares:
 *                 type: string
 *                 example: "Diabetes na família"
 *               habitos_vida:
 *                 type: string
 *                 example: "Fumante"
 *               medicamentos_em_uso:
 *                 type: string
 *                 example: "Paracetamol"
 *               alergias:
 *                 type: string
 *                 example: "Alergia a penicilina"
 *               cirurgias_previas:
 *                 type: string
 *                 example: "Apendicectomia"
 *               observacoes:
 *                 type: string
 *                 example: "Paciente ansioso"
 *     responses:
 *       200:
 *         description: Anamnese atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anamnese'
 *       404:
 *         description: Anamnese não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("anamnese_update"), (0, asyncHandler_1.asyncHandler)(anamneseController.update.bind(anamneseController)));
/**
 * @swagger
 * /anamnese/{id}:
 *   delete:
 *     summary: Exclui uma anamnese pelo ID
 *     tags: [Anamnese]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da anamnese
 *     responses:
 *       204:
 *         description: Anamnese deletada com sucesso
 *       404:
 *         description: Anamnese não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("anamnese_delete"), (0, asyncHandler_1.asyncHandler)(anamneseController.delete.bind(anamneseController)));
exports.default = router;
//# sourceMappingURL=anamnese.routes.js.map