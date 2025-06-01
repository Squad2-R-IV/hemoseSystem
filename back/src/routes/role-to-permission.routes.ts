import { Router } from "express";
import { container } from "tsyringe";
import { RoleToPermissionController } from "../controllers/RoleToPermissionController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const roleToPermissionController = container.resolve(RoleToPermissionController);

/**
 * @swagger
 * tags:
 *   name: RoleToPermission
 *   description: Endpoints para gerenciar associações entre roles e permissions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleToPermission:
 *       type: object
 *       required:
 *         - roleId
 *         - permissionId
 *       properties:
 *         roleId:
 *           type: string
 *           description: ID do role
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         permissionId:
 *           type: string
 *           description: ID da permission
 *           example: "550e8400-e29b-41d4-a716-446655440001"
 */

/**
 * @swagger
 * /role-to-permission:
 *   get:
 *     summary: Retorna todas as associações role-permission
 *     tags: [RoleToPermission]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de associações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleToPermission'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("role_permission_read"), asyncHandler(roleToPermissionController.getAll.bind(roleToPermissionController)));

/**
 * @swagger
 * /role-to-permission/permissions:
 *   get:
 *     summary: Retorna todas as permissions de um role específico
 *     tags: [RoleToPermission]
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
 *                 $ref: '#/components/schemas/RoleToPermission'
 *       404:
 *         description: Nenhuma permission encontrada para o role
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/permissions",
  authMiddleware,
  checkPermission("role_permission_read"),
  asyncHandler(roleToPermissionController.getPermissionsByRoleId.bind(roleToPermissionController))
);

/**
 * @swagger
 * /role-to-permission/roles:
 *   get:
 *     summary: Retorna todos os roles de uma permission específica
 *     tags: [RoleToPermission]
 *     parameters:
 *       - in: query
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permission
 *     responses:
 *       200:
 *         description: Lista de roles retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleToPermission'
 *       404:
 *         description: Nenhum role encontrado para a permission
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/roles",
  authMiddleware,
  checkPermission("role_permission_read"),
  asyncHandler(roleToPermissionController.getRolesByPermissionId.bind(roleToPermissionController))
);

/**
 * @swagger
 * /role-to-permission:
 *   post:
 *     summary: Cria uma nova associação role-permission
 *     tags: [RoleToPermission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionId
 *             properties:
 *               roleId:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               permissionId:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440001"
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleToPermission'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("role_permission_create"), asyncHandler(roleToPermissionController.create.bind(roleToPermissionController)));

/**
 * @swagger
 * /role-to-permission/{roleId}/{permissionId}:
 *   delete:
 *     summary: Exclui uma associação role-permission
 *     tags: [RoleToPermission]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permission
 *     responses:
 *       204:
 *         description: Associação deletada com sucesso
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:roleId/:permissionId", authMiddleware, checkPermission("role_permission_delete"), asyncHandler(roleToPermissionController.delete.bind(roleToPermissionController)));

export default router;
