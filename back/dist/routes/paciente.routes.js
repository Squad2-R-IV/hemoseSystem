"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const PacienteController_1 = require("../controllers/PacienteController");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const pacienteController = tsyringe_1.container.resolve(PacienteController_1.PacienteController);
/**
 * @swagger
 * tags:
 *   name: Paciente
 *   description: Endpoints para gerenciar pacientes
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       required:
 *         - nome_paciente
 *         - dt_nascimento
 *         - idade
 *         - sexo
 *         - estado_civil
 *         - endereco
 *         - cpf
 *         - cpf_acompanhante
 *       properties:
 *         id_paciente:
 *           type: integer
 *           description: ID único do paciente
 *           example: 1
 *         nome_paciente:
 *           type: string
 *           description: Nome do paciente
 *           example: "João da Silva"
 *         dt_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do paciente
 *           example: "1980-01-01"
 *         idade:
 *           type: integer
 *           description: Idade do paciente
 *           example: 45
 *         sexo:
 *           type: string
 *           description: Sexo do paciente
 *           example: "Masculino"
 *         estado_civil:
 *           type: string
 *           description: Estado civil do paciente
 *           example: "Casado"
 *         endereco:
 *           type: string
 *           description: Endereço do paciente
 *           example: "Rua das Flores, 123"
 *         cpf:
 *           type: string
 *           description: CPF do paciente
 *           example: "12345678901"
 *         cpf_acompanhante:
 *           type: string
 *           description: CPF do acompanhante do paciente
 *           example: "10987654321"
 */
/**
 * @swagger
 * /paciente/cpf/{cpf}:
 *   get:
 *     summary: Retorna um paciente pelo CPF
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/cpf/:cpf", auth_1.authMiddleware, (0, auth_1.checkPermission)("paciente_read"), (0, asyncHandler_1.asyncHandler)(pacienteController.findPacienteByCpf.bind(pacienteController)));
/**
 * @swagger
 * /paciente:
 *   get:
 *     summary: Retorna todos os pacientes
 *     tags: [Paciente]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("paciente_read"), (0, asyncHandler_1.asyncHandler)(pacienteController.getAll.bind(pacienteController)));
/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Paciente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("paciente_read"), (0, asyncHandler_1.asyncHandler)(pacienteController.getById.bind(pacienteController)));
/**
 * @swagger
 * /paciente:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Paciente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_paciente
 *               - dt_nascimento
 *               - idade
 *               - sexo
 *               - estado_civil
 *               - endereco
 *               - cpf
 *               - cpf_acompanhante
 *             properties:
 *               nome_paciente:
 *                 type: string
 *                 example: "João da Silva"
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1980-01-01"
 *               idade:
 *                 type: integer
 *                 example: 45
 *               sexo:
 *                 type: string
 *                 example: "Masculino"
 *               estado_civil:
 *                 type: string
 *                 example: "Casado"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               cpf_acompanhante:
 *                 type: string
 *                 example: "10987654321"
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth_1.authMiddleware, (0, auth_1.checkPermission)("paciente_create"), (0, asyncHandler_1.asyncHandler)(pacienteController.create.bind(pacienteController)));
/**
 * @swagger
 * /paciente/{id}:
 *   put:
 *     summary: Atualiza um paciente existente
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_paciente
 *               - dt_nascimento
 *               - idade
 *               - sexo
 *               - estado_civil
 *               - endereco
 *               - cpf
 *               - cpf_acompanhante
 *             properties:
 *               nome_paciente:
 *                 type: string
 *                 example: "João da Silva"
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1980-01-01"
 *               idade:
 *                 type: integer
 *                 example: 45
 *               sexo:
 *                 type: string
 *                 example: "Masculino"
 *               estado_civil:
 *                 type: string
 *                 example: "Casado"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               cpf_acompanhante:
 *                 type: string
 *                 example: "10987654321"
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("paciente_update"), (0, asyncHandler_1.asyncHandler)(pacienteController.update.bind(pacienteController)));
/**
 * @swagger
 * /paciente/{id}:
 *   delete:
 *     summary: Exclui um paciente pelo ID
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       204:
 *         description: Paciente deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.checkPermission)("paciente_delete"), (0, asyncHandler_1.asyncHandler)(pacienteController.delete.bind(pacienteController)));
exports.default = router;
//# sourceMappingURL=paciente.routes.js.map