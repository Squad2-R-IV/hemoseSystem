import { Router } from "express";
import { container } from "tsyringe";
import { PermissionController } from "../controllers/PermissionController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const permissionController = container.resolve(PermissionController);

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Endpoints para gerenciar permissions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da permission
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Nome da permission
 *           example: "user_create"
 *         description:
 *           type: string
 *           description: Descrição da permission
 *           example: "Permissão para criar usuários"
 */

/**
 * @swagger
 * /permission:
 *   get:
 *     summary: Retorna todas as permissions
 *     tags: [Permission]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de permissions retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("permission_read"), asyncHandler(permissionController.getAll.bind(permissionController)));

/**
 * @swagger
 * /permission/role:
 *   get:
 *     summary: Retorna todas as permissions de um role específico
 *     tags: [Permission]
 *     parameters:
 *       - in: query
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *     responses:
 *       200:
 *         description: Lista de permissions retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Nenhuma permission encontrada para o role
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/role",
  authMiddleware,
  checkPermission("permission_read"),
  asyncHandler(permissionController.getPermissionsByRoleId.bind(permissionController))
);

/**
 * @swagger
 * /permission/{id}:
 *   get:
 *     summary: Retorna uma permission pelo ID
 *     tags: [Permission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permission
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Permission encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("permission_read"), asyncHandler(permissionController.getById.bind(permissionController)));

/**
 * @swagger
 * /permission:
 *   post:
 *     summary: Cria uma nova permission
 *     tags: [Permission]
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
 *                 example: "user_create"
 *               description:
 *                 type: string
 *                 example: "Permissão para criar usuários"
 *     responses:
 *       201:
 *         description: Permission criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("permission_create"), asyncHandler(permissionController.create.bind(permissionController)));

/**
 * @swagger
 * /permission/{id}:
 *   put:
 *     summary: Atualiza uma permission existente
 *     tags: [Permission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "user_create"
 *               description:
 *                 type: string
 *                 example: "Permissão para criar usuários"
 *     responses:
 *       200:
 *         description: Permission atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("permission_update"), asyncHandler(permissionController.update.bind(permissionController)));

/**
 * @swagger
 * /permission/{id}:
 *   delete:
 *     summary: Exclui uma permission pelo ID
 *     tags: [Permission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permission
 *     responses:
 *       204:
 *         description: Permission deletada com sucesso
 *       404:
 *         description: Permission não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("permission_delete"), asyncHandler(permissionController.delete.bind(permissionController)));

export default router;
