import { Router } from "express";
import { container } from "tsyringe";
import { PrescricaoController } from "../controllers/PrescricaoController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const prescricaoController = container.resolve(PrescricaoController);

/**
 * @swagger
 * tags:
 *   name: Prescricao
 *   description: Endpoints para gerenciar prescrições
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Prescricao:
 *       type: object
 *       required:
 *         - id_consulta
 *         - dt_prescricao
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da prescrição
 *           example: 1
 *         id_consulta:
 *           type: integer
 *           description: ID da consulta relacionada
 *           example: 123
 *         dt_prescricao:
 *           type: string
 *           format: date-time
 *           description: Data da prescrição
 *           example: "2025-03-10T10:00:00Z"
 *         dieta:
 *           type: string
 *           nullable: true
 *           description: Dieta prescrita
 *           example: "Dieta líquida"
 *         decubito:
 *           type: string
 *           nullable: true
 *           description: Posição de decúbito
 *           example: "Decúbito dorsal"
 *         cuidados_especiais:
 *           type: string
 *           nullable: true
 *           description: Cuidados especiais
 *           example: "Trocar curativo diariamente"
 *         fisioterapia:
 *           type: string
 *           nullable: true
 *           description: Fisioterapia prescrita
 *           example: "Exercícios respiratórios"
 *         balanco_hidrico:
 *           type: boolean
 *           nullable: true
 *           description: Indica se há balanço hídrico
 *           example: true
 *         observacoes:
 *           type: string
 *           nullable: true
 *           description: Observações adicionais
 *           example: "Paciente em recuperação"
 */

/**
 * @swagger
 * /prescricao:
 *   get:
 *     summary: Retorna todas as prescrições
 *     tags: [Prescricao]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de prescrições retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prescricao'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("prescricao_read"), asyncHandler(prescricaoController.getAll.bind(prescricaoController)));

/**
 * @swagger
 * /prescricao/{id}:
 *   get:
 *     summary: Retorna uma prescrição pelo ID
 *     tags: [Prescricao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da prescrição
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Prescrição encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescricao'
 *       404:
 *         description: Prescrição não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("prescricao_read"), asyncHandler(prescricaoController.getById.bind(prescricaoController)));

/**
 * @swagger
 * /prescricao:
 *   post:
 *     summary: Cria uma nova prescrição
 *     tags: [Prescricao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescricao'
 *     responses:
 *       201:
 *         description: Prescrição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescricao'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("prescricao_create"), asyncHandler(prescricaoController.create.bind(prescricaoController)));

/**
 * @swagger
 * /prescricao/{id}:
 *   put:
 *     summary: Atualiza uma prescrição existente
 *     tags: [Prescricao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da prescrição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescricao'
 *     responses:
 *       200:
 *         description: Prescrição atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescricao'
 *       404:
 *         description: Prescrição não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("prescricao_update"), asyncHandler(prescricaoController.update.bind(prescricaoController)));

/**
 * @swagger
 * /prescricao/{id}:
 *   delete:
 *     summary: Exclui uma prescrição pelo ID
 *     tags: [Prescricao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da prescrição
 *     responses:
 *       204:
 *         description: Prescrição deletada com sucesso
 *       404:
 *         description: Prescrição não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("prescricao_delete"), asyncHandler(prescricaoController.delete.bind(prescricaoController)));

export default router;
