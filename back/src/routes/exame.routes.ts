import { Router } from "express";
import { container } from "tsyringe";
import { ExameController } from "../controllers/ExameController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const exameController = container.resolve(ExameController);

/**
 * @swagger
 * tags:
 *   name: Exame
 *   description: Endpoints para gerenciar exames
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exame:
 *       type: object
 *       required:
 *         - id_paciente
 *         - tipo_do_exame
 *         - dt_exame
 *         - profissional_responsavel
 *         - crm_profissional_responsavel
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do exame
 *           example: 1
 *         id_paciente:
 *           type: integer
 *           description: ID do paciente
 *           example: 1
 *         tipo_do_exame:
 *           type: string
 *           description: Tipo do exame
 *           example: "SANGUE"
 *         resultado:
 *           type: string
 *           nullable: true
 *           description: Resultado do exame
 *           example: "Valores normais"
 *         dt_exame:
 *           type: string
 *           format: date
 *           description: Data do exame
 *           example: "2024-01-15"
 *         profissional_responsavel:
 *           type: string
 *           description: Nome do profissional responsável
 *           example: "Dr. João Silva"
 *         crm_profissional_responsavel:
 *           type: string
 *           description: CRM do profissional responsável
 *           example: "CRM12345"
 *         status:
 *           type: string
 *           description: Status do exame
 *           example: "PENDENTE"
 */

/**
 * @swagger
 * /exame:
 *   post:
 *     summary: Cria um novo exame
 *     tags: [Exame]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_paciente
 *               - tipo_do_exame
 *               - dt_exame
 *               - profissional_responsavel
 *               - crm_profissional_responsavel
 *               - status
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 example: 1
 *               tipo_do_exame:
 *                 type: string
 *                 example: "SANGUE"
 *               resultado:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               dt_exame:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               profissional_responsavel:
 *                 type: string
 *                 example: "Dr. João Silva"
 *               crm_profissional_responsavel:
 *                 type: string
 *                 example: "CRM12345"
 *               status:
 *                 type: string
 *                 example: "PENDENTE"
 *     responses:
 *       201:
 *         description: Exame criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exame'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("exame_create"), asyncHandler(exameController.create.bind(exameController)));

/**
 * @swagger
 * /exame:
 *   get:
 *     summary: Retorna todos os exames
 *     tags: [Exame]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de exames retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exame'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("exame_read"), asyncHandler(exameController.getAll.bind(exameController)));

/**
 * @swagger
 * /exame/{id}:
 *   get:
 *     summary: Retorna um exame pelo ID
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do exame
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Exame encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exame'
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("exame_read"), asyncHandler(exameController.getById.bind(exameController)));

/**
 * @swagger
 * /exame/{id}:
 *   put:
 *     summary: Atualiza um exame existente
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do exame
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 example: 1
 *               tipo_do_exame:
 *                 type: string
 *                 example: "SANGUE"
 *               resultado:
 *                 type: string
 *                 nullable: true
 *                 example: "Valores normais"
 *               dt_exame:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               profissional_responsavel:
 *                 type: string
 *                 example: "Dr. João Silva"
 *               crm_profissional_responsavel:
 *                 type: string
 *                 example: "CRM12345"
 *               status:
 *                 type: string
 *                 example: "REALIZADO"
 *     responses:
 *       200:
 *         description: Exame atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exame'
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("exame_update"), asyncHandler(exameController.update.bind(exameController)));

/**
 * @swagger
 * /exame/{id}:
 *   delete:
 *     summary: Exclui um exame pelo ID
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do exame
 *     responses:
 *       204:
 *         description: Exame deletado com sucesso
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("exame_delete"), asyncHandler(exameController.delete.bind(exameController)));

/**
 * @swagger
 * /exame/paciente/{pacienteId}:
 *   get:
 *     summary: Retorna exames de um paciente específico
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de exames do paciente retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exame'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/paciente/:pacienteId", authMiddleware, checkPermission("exame_read"), asyncHandler(exameController.findExamesByPacienteId));

/**
 * @swagger
 * /exame/status/{status}:
 *   get:
 *     summary: Retorna exames por status
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Status do exame
 *         example: "REALIZADO"
 *     responses:
 *       200:
 *         description: Lista de exames com o status especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exame'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/status/:status", authMiddleware, checkPermission("exame_read"), asyncHandler(exameController.findExamesByStatus));

export default router;
