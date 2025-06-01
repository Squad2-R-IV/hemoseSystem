import { Router } from "express";
import { container } from "tsyringe";
import { RoleController } from "../controllers/RoleController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const roleController = container.resolve(RoleController);

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Endpoints para gerenciar roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do role
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Nome do role
 *           example: "Admin"
 *         description:
 *           type: string
 *           description: Descrição do role
 *           example: "Administrador do sistema"
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Retorna todos os roles
 *     tags: [Role]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de roles retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("role_read"), asyncHandler(roleController.getAll.bind(roleController)));

/**
 * @swagger
 * /role/user:
 *   get:
 *     summary: Retorna todos os roles de um usuário específico
 *     tags: [Role]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de roles retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       404:
 *         description: Nenhum role encontrado para o usuário
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/user",
  authMiddleware,
  checkPermission("role_read"),
  asyncHandler(roleController.getRolesByUserId.bind(roleController))
);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Retorna um role pelo ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Role encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("role_read"), asyncHandler(roleController.getById.bind(roleController)));

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Cria um novo role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *               description:
 *                 type: string
 *                 example: "Administrador do sistema"
 *     responses:
 *       201:
 *         description: Role criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("role_create"), asyncHandler(roleController.create.bind(roleController)));

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Atualiza um role existente
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *               description:
 *                 type: string
 *                 example: "Administrador do sistema"
 *     responses:
 *       200:
 *         description: Role atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("role_update"), asyncHandler(roleController.update.bind(roleController)));

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Exclui um role pelo ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *     responses:
 *       204:
 *         description: Role deletado com sucesso
 *       404:
 *         description: Role não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("role_delete"), asyncHandler(roleController.delete.bind(roleController)));

export default router;
