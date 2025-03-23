import { Router } from "express";
import { container } from "tsyringe";
import { AnamneseController } from "../controllers/AnamneseController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const anamneseController = container.resolve(AnamneseController);

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
 *         - id_paciente
 *         - descricao
 *         - data
 *       properties:
 *         id_anamnese:
 *           type: integer
 *           description: ID único da anamnese
 *           example: 1
 *         id_paciente:
 *           type: integer
 *           description: ID do paciente relacionado
 *           example: 123
 *         descricao:
 *           type: string
 *           description: Descrição da anamnese
 *           example: "Paciente relata dor de cabeça constante."
 *         data:
 *           type: string
 *           format: date-time
 *           description: Data da anamnese
 *           example: "2025-03-10T10:00:00Z"
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
router.get("/", authMiddleware, checkPermission("anamnese_read"), asyncHandler(anamneseController.getAll.bind(anamneseController)));

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
router.get("/:id", authMiddleware, checkPermission("anamnese_read"), asyncHandler(anamneseController.getById.bind(anamneseController)));

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
 *               - id_paciente
 *               - descricao
 *               - data
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 example: 123
 *               descricao:
 *                 type: string
 *                 example: "Paciente relata dor de cabeça constante."
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-10T10:00:00Z"
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
router.post("/", authMiddleware, checkPermission("anamnese_create"), asyncHandler(anamneseController.create.bind(anamneseController)));

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
 *             required:
 *               - descricao
 *               - data
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: "Paciente relata dor de cabeça constante."
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-10T10:00:00Z"
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
router.put("/:id", authMiddleware, checkPermission("anamnese_update"), asyncHandler(anamneseController.update.bind(anamneseController)));

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
router.delete("/:id", authMiddleware, checkPermission("anamnese_delete"), asyncHandler(anamneseController.delete.bind(anamneseController)));

export default router;
