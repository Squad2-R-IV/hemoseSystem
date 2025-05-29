import { Router } from "express";
import { container } from "tsyringe";
import { EvolucaoEnfermagemController } from "../controllers/EvolucaoEnfermagemController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const evolucaoEnfermagemController = container.resolve(EvolucaoEnfermagemController);

/**
 * @swagger
 * tags:
 *   name: EvolucaoEnfermagem
 *   description: Endpoints para gerenciar evoluções de enfermagem
 */

/**
 * @swagger
 * /evolucao-enfermagem/consulta:
 *   get:
 *     summary: Retorna todas as evoluções de enfermagem relacionadas a uma consulta específica
 *     tags: [EvolucaoEnfermagem]
 *     parameters:
 *       - in: query
 *         name: consultaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Lista de evoluções de enfermagem retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvolucaoEnfermagem'
 *       404:
 *         description: Nenhuma evolução de enfermagem encontrada para a consulta
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/consulta",
  authMiddleware,
  checkPermission("evolucao_enfermagem_read"),
  asyncHandler(evolucaoEnfermagemController.getEvolucoesEnfermagemByConsultaId.bind(evolucaoEnfermagemController))
);

/**
 * @swagger
 * components:
 *   schemas:
 *     EvolucaoEnfermagem:
 *       type: object
 *       required:
 *         - id_consulta
 *         - id_funcionario
 *         - observacoes_enfermagem
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da evolução de enfermagem
 *           example: 1
 *         id_consulta:
 *           type: integer
 *           description: ID da consulta relacionada
 *           example: 101
 *         id_funcionario:
 *           type: string
 *           description: ID do funcionário responsável
 *           example: "func123"
 *         dt_evolucao:
 *           type: string
 *           format: date-time
 *           description: Data e hora da evolução
 *           example: "2025-05-20T14:30:00Z"
 *         observacoes_enfermagem:
 *           type: string
 *           description: Observações de enfermagem
 *           example: "Paciente apresentou melhora do quadro geral"
 *         sinais_vitais:
 *           type: string
 *           description: Sinais vitais observados
 *           example: "PA: 120x80, FC: 72, FR: 16, T: 36.5°C"
 *         cuidados_realizados:
 *           type: string
 *           description: Cuidados de enfermagem realizados
 *           example: "Medicação administrada conforme prescrição"
 *         orientacoes:
 *           type: string
 *           description: Orientações dadas ao paciente
 *           example: "Repouso absoluto por 24h"
 */

/**
 * @swagger
 * /evolucao-enfermagem:
 *   get:
 *     summary: Retorna todas as evoluções de enfermagem
 *     tags: [EvolucaoEnfermagem]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de evoluções de enfermagem retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvolucaoEnfermagem'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("evolucao_enfermagem_read"), asyncHandler(evolucaoEnfermagemController.getAll.bind(evolucaoEnfermagemController)));

/**
 * @swagger
 * /evolucao-enfermagem/{id}:
 *   get:
 *     summary: Retorna uma evolução de enfermagem pelo ID
 *     tags: [EvolucaoEnfermagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evolução de enfermagem
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Evolução de enfermagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvolucaoEnfermagem'
 *       404:
 *         description: Evolução de enfermagem não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("evolucao_enfermagem_read"), asyncHandler(evolucaoEnfermagemController.getById.bind(evolucaoEnfermagemController)));

/**
 * @swagger
 * /evolucao-enfermagem:
 *   post:
 *     summary: Cria uma nova evolução de enfermagem
 *     tags: [EvolucaoEnfermagem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_consulta
 *               - id_funcionario
 *               - observacoes_enfermagem
 *             properties:
 *               id_consulta:
 *                 type: integer
 *                 example: 101
 *               id_funcionario:
 *                 type: string
 *                 example: "func123"
 *               observacoes_enfermagem:
 *                 type: string
 *                 example: "Paciente apresentou melhora do quadro geral"
 *               sinais_vitais:
 *                 type: string
 *                 example: "PA: 120x80, FC: 72, FR: 16, T: 36.5°C"
 *               cuidados_realizados:
 *                 type: string
 *                 example: "Medicação administrada conforme prescrição"
 *               orientacoes:
 *                 type: string
 *                 example: "Repouso absoluto por 24h"
 *     responses:
 *       201:
 *         description: Evolução de enfermagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvolucaoEnfermagem'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("evolucao_enfermagem_create"), asyncHandler(evolucaoEnfermagemController.create.bind(evolucaoEnfermagemController)));

/**
 * @swagger
 * /evolucao-enfermagem/{id}:
 *   put:
 *     summary: Atualiza uma evolução de enfermagem existente
 *     tags: [EvolucaoEnfermagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evolução de enfermagem
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
 *               dt_evolucao:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-20T14:30:00Z"
 *               observacoes_enfermagem:
 *                 type: string
 *                 example: "Paciente apresentou melhora do quadro geral"
 *               sinais_vitais:
 *                 type: string
 *                 example: "PA: 120x80, FC: 72, FR: 16, T: 36.5°C"
 *               cuidados_realizados:
 *                 type: string
 *                 example: "Medicação administrada conforme prescrição"
 *               orientacoes:
 *                 type: string
 *                 example: "Repouso absoluto por 24h"
 *     responses:
 *       200:
 *         description: Evolução de enfermagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvolucaoEnfermagem'
 *       404:
 *         description: Evolução de enfermagem não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("evolucao_enfermagem_update"), asyncHandler(evolucaoEnfermagemController.update.bind(evolucaoEnfermagemController)));

/**
 * @swagger
 * /evolucao-enfermagem/{id}:
 *   delete:
 *     summary: Exclui uma evolução de enfermagem pelo ID
 *     tags: [EvolucaoEnfermagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evolução de enfermagem
 *     responses:
 *       204:
 *         description: Evolução de enfermagem deletada com sucesso
 *       404:
 *         description: Evolução de enfermagem não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("evolucao_enfermagem_delete"), asyncHandler(evolucaoEnfermagemController.delete.bind(evolucaoEnfermagemController)));

export default router;
