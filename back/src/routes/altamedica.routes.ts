import { Router } from "express";
import { container } from "tsyringe";
import { AltaMedicaController } from "../controllers/AltaMedicaController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const altaMedicaController = container.resolve(AltaMedicaController);

/**
 * @swagger
 * tags:
 *   name: AltaMedica
 *   description: Endpoints para gerenciar altas médicas
 */

/**
 * @swagger
 * /alta-medica/consulta:
 *   get:
 *     summary: Retorna todas as altas médicas relacionadas a uma consulta específica
 *     tags: [AltaMedica]
 *     parameters:
 *       - in: query
 *         name: consultaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Lista de altas médicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AltaMedica'
 *       404:
 *         description: Nenhuma alta médica encontrada para a consulta
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/consulta",
  authMiddleware,
  checkPermission("alta_medica_read"),
  asyncHandler(altaMedicaController.getAltaMedicaByConsultaId.bind(altaMedicaController))
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AltaMedica:
 *       type: object
 *       required:
 *         - id_consulta
 *         - id_medico
 *         - tipo_alta
 *         - relatorio
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da alta médica
 *           example: 1
 *         id_consulta:
 *           type: integer
 *           description: ID da consulta relacionada
 *           example: 101
 *         id_medico:
 *           type: string
 *           description: ID do médico responsável pela alta
 *           example: "medico123"
 *         dt_alta:
 *           type: string
 *           format: date-time
 *           description: Data e hora da alta médica
 *           example: "2025-05-20T14:30:00Z"
 *         tipo_alta:
 *           type: string
 *           enum: [OBITO, CURA, TRANSFERENCIA, ALTA, EVASAO, OUTRO]
 *           description: Tipo de alta médica
 *           example: "ALTA"
 *         relatorio:
 *           type: string
 *           description: Relatório da alta médica
 *           example: "Paciente apresentou evolução satisfatória e está apto para alta hospitalar"
 *         medico:
 *           $ref: '#/components/schemas/User'
 *           description: Dados do médico responsável
 *         consulta:
 *           $ref: '#/components/schemas/Consulta'
 *           description: Dados da consulta relacionada
 */

/**
 * @swagger
 * /alta-medica:
 *   get:
 *     summary: Retorna todas as altas médicas
 *     tags: [AltaMedica]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de altas médicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AltaMedica'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("alta_medica_read"), asyncHandler(altaMedicaController.getAll.bind(altaMedicaController)));

/**
 * @swagger
 * /alta-medica/{id}:
 *   get:
 *     summary: Retorna uma alta médica pelo ID
 *     tags: [AltaMedica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da alta médica
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Alta médica encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AltaMedica'
 *       404:
 *         description: Alta médica não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("alta_medica_read"), asyncHandler(altaMedicaController.getById.bind(altaMedicaController)));

/**
 * @swagger
 * /alta-medica:
 *   post:
 *     summary: Cria uma nova alta médica
 *     tags: [AltaMedica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_consulta
 *               - id_medico
 *               - tipo_alta
 *               - relatorio
 *             properties:
 *               id_consulta:
 *                 type: integer
 *                 example: 101
 *               id_medico:
 *                 type: string
 *                 example: "medico123"
 *               dt_alta:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-20T14:30:00Z"
 *               tipo_alta:
 *                 type: string
 *                 enum: [OBITO, CURA, TRANSFERENCIA, ALTA, EVASAO, OUTRO]
 *                 example: "ALTA"
 *               relatorio:
 *                 type: string
 *                 example: "Paciente apresentou evolução satisfatória e está apto para alta hospitalar"
 *     responses:
 *       201:
 *         description: Alta médica criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AltaMedica'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("alta_medica_create"), asyncHandler(altaMedicaController.create.bind(altaMedicaController)));

/**
 * @swagger
 * /alta-medica/{id}:
 *   put:
 *     summary: Atualiza uma alta médica existente
 *     tags: [AltaMedica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da alta médica
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
 *               id_medico:
 *                 type: string
 *                 example: "medico123"
 *               dt_alta:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-20T14:30:00Z"
 *               tipo_alta:
 *                 type: string
 *                 enum: [OBITO, CURA, TRANSFERENCIA, ALTA, EVASAO, OUTRO]
 *                 example: "ALTA"
 *               relatorio:
 *                 type: string
 *                 example: "Paciente apresentou evolução satisfatória e está apto para alta hospitalar"
 *     responses:
 *       200:
 *         description: Alta médica atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AltaMedica'
 *       404:
 *         description: Alta médica não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("alta_medica_update"), asyncHandler(altaMedicaController.update.bind(altaMedicaController)));

/**
 * @swagger
 * /alta-medica/{id}:
 *   delete:
 *     summary: Exclui uma alta médica pelo ID
 *     tags: [AltaMedica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da alta médica
 *     responses:
 *       204:
 *         description: Alta médica deletada com sucesso
 *       404:
 *         description: Alta médica não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("alta_medica_delete"), asyncHandler(altaMedicaController.delete.bind(altaMedicaController)));

export default router;
