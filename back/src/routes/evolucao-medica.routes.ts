import { Router } from "express";
import { container } from "tsyringe";
import { EvolucaoMedicaController } from "../controllers/EvolucaoMedicaController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const evolucaoMedicaController = container.resolve(EvolucaoMedicaController);

/**
 * @swagger
 * tags:
 *   name: EvolucaoMedica
 *   description: Endpoints para gerenciar evoluções médicas
 */
/**
 * @swagger
 * /evolucao-medica/consulta:
 *   get:
 *     summary: Retorna todas as evoluções médicas relacionadas a uma consulta específica
 *     tags: [EvolucaoMedica]
 *     parameters:
 *       - in: query
 *         name: consultaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Lista de evoluções médicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvolucaoMedica'
 *       404:
 *         description: Nenhuma evolução médica encontrada para a consulta
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/consulta",
  authMiddleware,
  checkPermission("evolucao_medica_read"),
  asyncHandler(evolucaoMedicaController.getEvolucoesMedicasByConsultaId.bind(evolucaoMedicaController))
);
/**
 * @swagger
 * components:
 *   schemas:
 *     EvolucaoMedica:
 *       type: object
 *       required:
 *         - id_consulta
 *         - id_funcionario
 *         - conduta
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da evolução médica
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
 *         queixas:
 *           type: string
 *           description: Queixas do paciente
 *           example: "Dor abdominal persistente"
 *         exame_fisico:
 *           type: string
 *           description: Resultados do exame físico
 *           example: "Abdômen rígido, doloroso à palpação"
 *         conduta:
 *           type: string
 *           description: Conduta médica adotada
 *           example: "Medicação analgésica e monitoramento"
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *           example: "Paciente apresentou melhora após medicação"
 */

/**
 * @swagger
 * /evolucao-medica:
 *   get:
 *     summary: Retorna todas as evoluções médicas
 *     tags: [EvolucaoMedica]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de evoluções médicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvolucaoMedica'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("evolucao_medica_read"), asyncHandler(evolucaoMedicaController.getAll.bind(evolucaoMedicaController)));



/**
 * @swagger
 * /evolucao-medica/{id}:
 *   get:
 *     summary: Retorna uma evolução médica pelo ID
 *     tags: [EvolucaoMedica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evolução médica
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Evolução médica encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvolucaoMedica'
 *       404:
 *         description: Evolução médica não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("evolucao_medica_read"), asyncHandler(evolucaoMedicaController.getById.bind(evolucaoMedicaController)));

/**
 * @swagger
 * /evolucao-medica:
 *   post:
 *     summary: Cria uma nova evolução médica
 *     tags: [EvolucaoMedica]
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
 *               queixas:
 *                 type: string
 *                 example: "Dor abdominal persistente"
 *               exame_fisico:
 *                 type: string
 *                 example: "Abdômen rígido, doloroso à palpação"
 *               conduta:
 *                 type: string
 *                 example: "Medicação analgésica e monitoramento"
 *               observacoes:
 *                 type: string
 *                 example: "Paciente apresentou melhora após medicação"
 *     responses:
 *       201:
 *         description: Evolução médica criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvolucaoMedica'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("evolucao_medica_create"), asyncHandler(evolucaoMedicaController.create.bind(evolucaoMedicaController)));

/**
 * @swagger
 * /evolucao-medica/{id}:
 *   put:
 *     summary: Atualiza uma evolução médica existente
 *     tags: [EvolucaoMedica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evolução médica
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
 *               queixas:
 *                 type: string
 *                 example: "Dor abdominal persistente"
 *               exame_fisico:
 *                 type: string
 *                 example: "Abdômen rígido, doloroso à palpação"
 *               conduta:
 *                 type: string
 *                 example: "Medicação analgésica e monitoramento"
 *               observacoes:
 *                 type: string
 *                 example: "Paciente apresentou melhora após medicação"
 *     responses:
 *       200:
 *         description: Evolução médica atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvolucaoMedica'
 *       404:
 *         description: Evolução médica não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("evolucao_medica_update"), asyncHandler(evolucaoMedicaController.update.bind(evolucaoMedicaController)));

/**
 * @swagger
 * /evolucao-medica/{id}:
 *   delete:
 *     summary: Exclui uma evolução médica pelo ID
 *     tags: [EvolucaoMedica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evolução médica
 *     responses:
 *       204:
 *         description: Evolução médica deletada com sucesso
 *       404:
 *         description: Evolução médica não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("evolucao_medica_delete"), asyncHandler(evolucaoMedicaController.delete.bind(evolucaoMedicaController)));

export default router;
