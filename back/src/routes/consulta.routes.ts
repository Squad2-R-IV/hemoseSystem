import { Router } from "express";
import { container } from "tsyringe";
import { ConsultaController } from "../controllers/ConsultaController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const consultaController = container.resolve(ConsultaController);

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
router.get("/", authMiddleware, checkPermission("consultas_read"), asyncHandler(consultaController.getAll.bind(consultaController)));

/**
 * @swagger
 * /consulta/paciente:
 *   get:
 *     summary: Retorna todas as consultas relacionadas a um paciente específico
 *     tags: [Consulta]
 *     parameters:
 *       - in: query
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de consultas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 *       404:
 *         description: Nenhuma consulta encontrada para o paciente
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/paciente",
  authMiddleware,
  checkPermission("consultas_read"),
  asyncHandler(consultaController.getConsultasByPacientId.bind(consultaController))
);

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
router.get("/:id", authMiddleware, checkPermission("consultas_read"), asyncHandler(consultaController.getById.bind(consultaController)));

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
router.post("/", authMiddleware, checkPermission("consultas_create"), asyncHandler(consultaController.create.bind(consultaController)));

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
router.put("/:id", authMiddleware, checkPermission("consultas_update"), asyncHandler(consultaController.update.bind(consultaController)));

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
router.delete("/:id", authMiddleware, checkPermission("consultas_delete"), asyncHandler(consultaController.delete.bind(consultaController)));

export default router;